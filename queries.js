// - Write MongoDB queries to:
//   - Find all books in a specific genre

db.books.find({
  genre: "Adventure"
})

{
  _id: ObjectId('68df5e16310d605f2c75b7c4'),
  title: 'Moby Dick',
  author: 'Herman Melville',
  genre: 'Adventure',
  published_year: 1851,
  price: 12.5,
  in_stock: false,
  pages: 635,
  publisher: 'Harper & Brothers'
}

//  Find books published after a certain year

db.books.find({
  published_year: {$gt: 1900}
})

{
  _id: ObjectId('68df5e16310d605f2c75b7c2'),
  title: 'Animal Farm',
  author: 'George Orwell',
  genre: 'Political Satire',
  published_year: 1945,
  price: 8.5,
  in_stock: false,
  pages: 112,
  publisher: 'Secker & Warburg'
}

{
  _id: ObjectId('68df5e16310d605f2c75b7c1'),
  title: 'The Lord of the Rings',
  author: 'J.R.R. Tolkien',
  genre: 'Fantasy',
  published_year: 1954,
  price: 19.99,
  in_stock: true,
  pages: 1178,
  publisher: 'Allen & Unwin'
}

// Find books by a specific author


db.books.find({
  author: 'George Orwell'
})

{
  _id: ObjectId('68df5e16310d605f2c75b7bb'),
  title: '1984',
  author: 'George Orwell',
  genre: 'Dystopian',
  published_year: 1949,
  price: 10.99,
  in_stock: true,
  pages: 328,
  publisher: 'Secker & Warburg'
}

{
  _id: ObjectId('68df5e16310d605f2c75b7c2'),
  title: 'Animal Farm',
  author: 'George Orwell',
  genre: 'Political Satire',
  published_year: 1945,
  price: 8.5,
  in_stock: false,
  pages: 112,
  publisher: 'Secker & Warburg'
}


// Update the price of a specific book

b.books.updateOne(
  {title: 'Animal Farm' },
  {$set: {price: 20.0 }}
)

{
  acknowledged: true,
  insertedId: null,
  matchedCount: 1,
  modifiedCount: 1,
  upsertedCount: 0
}

// Delete a book by its title


db.books.deleteOne(
  {title: "The Alchemist"}
)

{
  acknowledged: true,
  deletedCount: 0
}


// ### Task 3: Advanced Queries
// - Write a query to find books that are both in stock and published after 2010
 db.books.find({
    in_stock: true,
    published_year:{$gt:2010}
 })
{
  _id: ObjectId('68df7ee2a728e745ed7e690c'),
  title: 'Sapiens: A Brief History of Humankind',
  author: 'Yuval Noah Harari',
  genre: 'History',
  published_year: 2011,
  price: 18.25,
  in_stock: true,
  pages: 512,
  publisher: 'Dvir Publishing House'
}
{

_id: ObjectId('68df7ee2a728e745ed7e690e'),
  title: 'Where the Crawdads Sing',
  author: 'Delia Owens',
  genre: 'Mystery',
  published_year: 2018,
  price: 16.5,
  in_stock: true,
  pages: 384,
  publisher: "G.P. Putnam's Sons"
}


// - Use projection to return only the title, author, and price fields in your queries

db.books.find(
  { published_year: { $gt: 2000 } }, 
  { title: 1, author: 1, price: 1, _id: 0 }
)

{
  title: 'Sapiens: A Brief History of Humankind',
  author: 'Yuval Noah Harari',
  price: 18.25
}


{
  title: 'Where the Crawdads Sing',
  author: 'Delia Owens',
  price: 16.5
}


// - Implement sorting to display books by price (both ascending and descending)

// Use a sort value of -1 for descending order.

db.books.find(
  { in_stock: true, published_year: { $gt: 2010 } },
  { title: 1, author: 1, price: 1, _id: 0 }
)
.sort({ price: -1 })

{
  title: 'Sapiens: A Brief History of Humankind',
  author: 'Yuval Noah Harari',
  price: 18.25
}

{
  title: 'Sapiens: A Brief History of Humankind',
  author: 'Yuval Noah Harari',
  price: 18.25
}

// Use a sort value of -1 for ascending order.

db.books.find(
  { in_stock: true, published_year: { $gt: 2010 } },
  { title: 1, author: 1, price: 1, _id: 0 }
)
.sort({ price: 1 })

{
  title: 'Where the Crawdads Sing',
  author: 'Delia Owens',
  price: 16.5
}


{
  title: 'Sapiens: A Brief History of Humankind',
  author: 'Yuval Noah Harari',
  price: 18.25
}



// - Use the `limit` and `skip` methods to implement pagination (5 books per page)


db.books.find(
  { in_stock: true, published_year: { $gt: 2010 } },
  { title: 1, author: 1, price: 1, _id: 0 }
)
.sort({ price: -1 })
.skip(5) // (Page Number - 1) * Limit -> (2 - 1) * 5 = 5
.limit(5)


// ### Task 4: Aggregation Pipeline
// - Create an aggregation pipeline to calculate the average price of books by genre
// Calculate the average price of books per genre
db.books.aggregate([
  {
    $group: {
      _id: "$genre", // Group by the 'genre' field
      average_price: { $avg: "$price" }, // Calculate the average of 'price'
      total_books: { $sum: 1 } // Count the number of books in the group
    }
  },
  {
    $sort: { average_price: -1 } // Optional: Sort to see the most expensive genres first
  }
])


// - Create an aggregation pipeline to find the author with the most books in the collection

db.books.aggregate([
  {
    $group: {
      _id: "$author", // Group by the 'author' field
      book_count: { $sum: 1 } // Count the number of books per author
    }
  },
  {
    $sort: { book_count: -1 } // Sort in descending order to put the highest count first
  },
  {
    $limit: 1 // Only return the top author
  }
])
// - Implement a pipeline that groups books by publication decade and counts them
// Group books by publication decade (e.g., 1990s, 2000s)
db.books.aggregate([
  {
    $group: {
      // Calculate the decade: subtract the remainder of (year / 10) from the year, then append 's'
      _id: {
        $concat: [
          { $toString: { $subtract: ["$published_year", { $mod: ["$published_year", 10] }] } },
          "s"
        ]
      },
      count: { $sum: 1 }
    }
  },
  {
    $sort: { _id: 1 } // Sort by decade in ascending order
  },
  {
    $project: {
      _id: 0,
      decade: "$_id",
      count: 1
    }
  }
])


// ### Task 5: Indexing
// - Create an index on the `title` field for faster searches

db.books.createIndex({ title: 1 })


// - Create a compound index on `author` and `published_year`
db.books.createIndex({ author: 1, published_year: -1 })

// - Use the `explain()` method to demonstrate the performance improvement with your indexes
// Run this BEFORE the db.books.createIndex({ title: 1 }) command
db.books.find({ title: "Animal Farm" }).explain("executionStats")
db.books.createIndex({ title: 1 })
// Run this AFTER the db.books.createIndex({ title: 1 }) command
db.books.find({ title: "Animal Farm" }).explain("executionStats")


