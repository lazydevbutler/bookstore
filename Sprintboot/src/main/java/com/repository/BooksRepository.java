package com.repository;

import com.Model.Books;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BooksRepository extends PagingAndSortingRepository<Books,Long> {

    List<Books> findByTitleContaining(String title);

    List<Books> findAll();

}
