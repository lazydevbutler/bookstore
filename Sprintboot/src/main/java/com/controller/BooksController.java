package com.controller;

import com.Model.Books;
import com.repository.BooksRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api")
public class BooksController {

    @Autowired
    private BooksRepository booksRepository;

    @GetMapping("/books")
    public ResponseEntity<List<Books>> getBooks(@RequestParam(required = false) String title){
        List<Books> books = new ArrayList<Books>();

        if(title==null){
            booksRepository.findAll().forEach(books::add);
        }else{
            booksRepository.findByTitleContaining(title).forEach(books::add);
        }
        return ResponseEntity.ok(books);
    }

    @CrossOrigin(origins = "http://localhost:8080")
    @PostMapping("/books")
    public ResponseEntity<?> addBooks(@RequestBody Books books){
       try {
           Books _books = booksRepository.save(new Books(books.getTitle(), books.getAuthor(), books.getPrice()));
           return new ResponseEntity<>(_books, HttpStatus.CREATED);
       }catch (Exception e){
           return new ResponseEntity<>("Create fail.", HttpStatus.INTERNAL_SERVER_ERROR);
       }
    }
}
