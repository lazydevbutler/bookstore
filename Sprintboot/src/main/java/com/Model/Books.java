package com.Model;


import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Data
@Entity
@NoArgsConstructor
@Table(name="books")
public class Books {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer book_id;
    @Column(name="title")
    private String title;
    @Column(name="author")
    private String author;
    @Column(name="price")
    private Float price;

    public Books(String title, String author, Float price){
        this.title = title;
        this.author = author;
        this.price = price;
    }
    public Integer getBook_Id(){
        return book_id;
    }
    public String getTitle(){
        return title;
    }
    public String getAuthor(){
        return author;
    }
    public Float getPrice(){
        return price;
    }

    public void setTitle(String title){
       this.title = title;
    }

    public void setAuthor(String author){
        this.author = author;
    }

    public void setPrice(Float price){
        this.price = price;
    }

}
