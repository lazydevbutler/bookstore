import Paper from "@mui/material/Paper";
import React from "react";
import {
  Column,
  DataTypeProvider,
  DataTypeProviderProps,
} from "@devexpress/dx-react-grid";
import {
  Grid,
  Table,
  TableHeaderRow,
} from "@devexpress/dx-react-grid-material-ui";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormHelperText,
  Input,
  InputAdornment,
  InputLabel,
  TextField,
  Typography,
} from "@mui/material";
import { addBook, getBooks } from "../../services/books";

interface BookInfo {
  title: string;
  author: string;
  price: number;
}

const BooksPage = () => {
  const [open, setOpen] = React.useState(false);

  const defaultBookInfo: BookInfo = {
    title: "",
    author: "",
    price: 0,
  };

  const [bookInfo, setBookInfo] = React.useState<BookInfo>(defaultBookInfo);

  const [searchTitle, setSearchTitle] = React.useState<string>("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setErrorInputText({
      title: "",
      author: "",
      price: "",
    });
    setBookInfo(defaultBookInfo);
    setOpen(false);
  };

  const [errorInputText, setErrorInputText] = React.useState<{
    [index: string]: any;
  }>({
    title: "",
    author: "",
    price: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    const name = e.target.name;
    if (name == "price" && !parseFloat(e.target.value)) {
      setErrorInputText((prev) => ({
        ...prev,
        price: "Invalid price",
      }));
    } else if (name == "price" && parseFloat(e.target.value)) {
      setErrorInputText((prev) => ({
        ...prev,
        price: "",
      }));
    }
    setBookInfo((prev) => ({ ...prev, [name]: e.target.value }));
  };

  const columns: ReadonlyArray<Column> = [
    { name: "title", title: "Title" },
    { name: "author", title: "Author" },
    { name: "price", title: "Price" },
  ];

  const [tableData, setTableData] = React.useState([]);

  React.useEffect(() => {
    getBooks().then((data) => setTableData(data.data));
  }, []);

  const handleSubmit = () => {
    if (bookInfo.title == "") {
      return setErrorInputText((prev) => ({
        ...prev,
        title: "Title is empty",
      }));
    } else {
      setErrorInputText((prev) => ({
        ...prev,
        title: "",
      }));
    }

    if (bookInfo.author == "") {
      return setErrorInputText((prev) => ({
        ...prev,
        author: "Author is empty",
      }));
    } else {
      setErrorInputText((prev) => ({
        ...prev,
        author: "",
      }));
    }

    if (!bookInfo.price) {
      return setErrorInputText((prev) => ({
        ...prev,
        price: "Price is empty",
      }));
    } else if (errorInputText.price) {
      return;
    } else {
      setErrorInputText((prev) => ({
        ...prev,
        price: "",
      }));
    }

    addBook(bookInfo.title, bookInfo.author, bookInfo.price)
      .then(() => {
        return getBooks();
      })
      .then((data) => setTableData(data.data))
      .then(handleClose);
  };

  const handleSearchTitle = () => {
    getBooks(searchTitle).then((data) => setTableData(data.data));
  };

  const PriceFormatter = (props: DataTypeProviderProps) => (
    <DataTypeProvider
      formatterComponent={({ value }: { value: string }) => {
        return <Typography>{`$ ${value}`}</Typography>;
      }}
      {...props}
    />
  );

  return (
    <>
      <Button variant="contained" onClick={handleClickOpen}>
        Add Books
      </Button>
      <br />
      <br />
      <div style={{ display: "inline" }}>
        <TextField
          autoFocus
          margin="dense"
          id="search"
          name="search"
          label="Search Title"
          value={searchTitle}
          onChange={(e) => setSearchTitle(e.target.value)}
          type="text"
          variant="standard"
        />

        <Button
          variant="contained"
          onClick={handleSearchTitle}
          sx={{ marginTop: "15px", marginLeft: "10px" }}
        >
          Search
        </Button>
      </div>

      <br />
      <br />
      <Paper>
        <Grid columns={columns} rows={tableData}>
          <Table />
          <PriceFormatter for={["price"]} />
          <TableHeaderRow />
        </Grid>
      </Paper>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add new Books</DialogTitle>

        <DialogContent>
          <TextField
            autoFocus
            fullWidth
            margin="dense"
            id="title"
            name="title"
            label="Title"
            error={errorInputText["title"] != ""}
            helperText={errorInputText["title"]}
            value={bookInfo.title}
            onChange={handleChange}
            type="text"
            variant="standard"
          />

          <TextField
            fullWidth
            margin="dense"
            id="author"
            name="author"
            error={errorInputText["author"] != ""}
            helperText={errorInputText["author"]}
            value={bookInfo.author}
            onChange={handleChange}
            label="Author"
            type="text"
            variant="standard"
          />

          <FormControl fullWidth sx={{ marginTop: 1 }} variant="standard">
            <InputLabel
              htmlFor="price"
              focused
              sx={{
                color: errorInputText.price == "" ? "rgba(0,0,0,0.6)" : "red",
              }}
            >
              Price
            </InputLabel>
            <Input
              id="price"
              value={bookInfo.price}
              name="price"
              error={errorInputText["price"] != ""}
              onChange={handleChange}
              startAdornment={
                <InputAdornment position="start">$</InputAdornment>
              }
            />
            <FormHelperText
              sx={{
                color: errorInputText.price == "" ? "rgba(0,0,0,0.6)" : "red",
              }}
            >
              {errorInputText.price}
            </FormHelperText>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Submit</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default BooksPage;
