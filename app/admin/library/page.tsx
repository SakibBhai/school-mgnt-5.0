"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Plus,
  Search,
  MoreHorizontal,
  Eye,
  Edit,
  Trash2,
  BookOpen,
  Library,
  Download,
  Upload,
  Bookmark,
  CheckCircle,
  AlertCircle,
} from "lucide-react"

// Mock data for books
const mockBooks = [
  {
    id: 1,
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    isbn: "978-0-06-112008-4",
    publicationDate: "1960-07-11",
    genre: "Fiction",
    tags: ["Classic", "Drama", "Social Issues"],
    description: "A gripping tale of racial injustice and childhood innocence in the American South.",
    status: "available",
    totalCopies: 5,
    availableCopies: 3,
    borrowedCopies: 2,
    reservedCopies: 0,
    location: "A-101",
    addedDate: "2024-01-15",
  },
  {
    id: 2,
    title: "1984",
    author: "George Orwell",
    isbn: "978-0-452-28423-4",
    publicationDate: "1949-06-08",
    genre: "Science Fiction",
    tags: ["Dystopian", "Political", "Classic"],
    description: "A dystopian social science fiction novel about totalitarian control.",
    status: "borrowed",
    totalCopies: 4,
    availableCopies: 0,
    borrowedCopies: 3,
    reservedCopies: 1,
    location: "B-205",
    addedDate: "2024-01-10",
  },
  {
    id: 3,
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    isbn: "978-0-7432-7356-5",
    publicationDate: "1925-04-10",
    genre: "Fiction",
    tags: ["Classic", "Romance", "American Literature"],
    description: "A classic American novel about the Jazz Age and the American Dream.",
    status: "available",
    totalCopies: 6,
    availableCopies: 4,
    borrowedCopies: 2,
    reservedCopies: 0,
    location: "A-150",
    addedDate: "2024-01-20",
  },
  {
    id: 4,
    title: "Pride and Prejudice",
    author: "Jane Austen",
    isbn: "978-0-14-143951-8",
    publicationDate: "1813-01-28",
    genre: "Romance",
    tags: ["Classic", "Romance", "British Literature"],
    description: "A romantic novel about manners, upbringing, morality, and marriage.",
    status: "reserved",
    totalCopies: 3,
    availableCopies: 1,
    borrowedCopies: 1,
    reservedCopies: 1,
    location: "C-301",
    addedDate: "2024-01-05",
  },
]

// Mock data for borrowing records
const mockBorrowingRecords = [
  {
    id: 1,
    bookId: 1,
    bookTitle: "To Kill a Mockingbird",
    borrowerName: "John Smith",
    borrowerType: "Student",
    borrowerId: "STU001",
    borrowDate: "2024-01-20",
    dueDate: "2024-02-03",
    returnDate: null,
    status: "borrowed",
    fine: 0,
  },
  {
    id: 2,
    bookId: 2,
    bookTitle: "1984",
    borrowerName: "Sarah Johnson",
    borrowerType: "Teacher",
    borrowerId: "TCH001",
    borrowDate: "2024-01-18",
    dueDate: "2024-02-01",
    returnDate: null,
    status: "overdue",
    fine: 5.0,
  },
  {
    id: 3,
    bookId: 3,
    bookTitle: "The Great Gatsby",
    borrowerName: "Mike Davis",
    borrowerType: "Student",
    borrowerId: "STU002",
    borrowDate: "2024-01-15",
    dueDate: "2024-01-29",
    returnDate: "2024-01-28",
    status: "returned",
    fine: 0,
  },
]

const genres = [
  "Fiction",
  "Non-Fiction",
  "Science Fiction",
  "Fantasy",
  "Mystery",
  "Romance",
  "Thriller",
  "Biography",
  "History",
  "Science",
  "Technology",
  "Education",
  "Children",
  "Young Adult",
  "Poetry",
  "Drama",
  "Philosophy",
  "Religion",
]

const availableTags = [
  "Classic",
  "Bestseller",
  "Award Winner",
  "New Release",
  "Popular",
  "Recommended",
  "Educational",
  "Reference",
  "Research",
  "Textbook",
  "Novel",
  "Short Stories",
  "Poetry",
  "Drama",
  "Biography",
  "Autobiography",
  "Historical",
  "Contemporary",
]

export default function LibraryPage() {
  const [books, setBooks] = useState(mockBooks)
  const [borrowingRecords, setBorrowingRecords] = useState(mockBorrowingRecords)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedGenre, setSelectedGenre] = useState("all")
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [isAddBookOpen, setIsAddBookOpen] = useState(false)
  const [isEditBookOpen, setIsEditBookOpen] = useState(false)
  const [isViewBookOpen, setIsViewBookOpen] = useState(false)
  const [isBorrowBookOpen, setIsBorrowBookOpen] = useState(false)
  const [isReturnBookOpen, setIsReturnBookOpen] = useState(false)
  const [selectedBook, setSelectedBook] = useState(null)
  const [activeTab, setActiveTab] = useState("books")

  // New book form state
  const [newBook, setNewBook] = useState({
    title: "",
    author: "",
    isbn: "",
    publicationDate: "",
    genre: "",
    tags: [],
    description: "",
    totalCopies: 1,
    location: "",
  })

  // Borrow book form state
  const [borrowForm, setBorrowForm] = useState({
    borrowerName: "",
    borrowerType: "Student",
    borrowerId: "",
    borrowDuration: 14,
  })

  // Filter books based on search and filters
  const filteredBooks = books.filter((book) => {
    const matchesSearch =
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.isbn.includes(searchTerm) ||
      book.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))

    const matchesGenre = selectedGenre === "all" || book.genre === selectedGenre
    const matchesStatus = selectedStatus === "all" || book.status === selectedStatus

    return matchesSearch && matchesGenre && matchesStatus
  })

  // Get status badge color
  const getStatusBadge = (status) => {
    switch (status) {
      case "available":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Available</Badge>
      case "borrowed":
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Borrowed</Badge>
      case "reserved":
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">Reserved</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  // Handle add book
  const handleAddBook = () => {
    const book = {
      id: books.length + 1,
      ...newBook,
      status: "available",
      availableCopies: newBook.totalCopies,
      borrowedCopies: 0,
      reservedCopies: 0,
      addedDate: new Date().toISOString().split("T")[0],
    }
    setBooks([...books, book])
    setNewBook({
      title: "",
      author: "",
      isbn: "",
      publicationDate: "",
      genre: "",
      tags: [],
      description: "",
      totalCopies: 1,
      location: "",
    })
    setIsAddBookOpen(false)
  }

  // Handle borrow book
  const handleBorrowBook = () => {
    const borrowRecord = {
      id: borrowingRecords.length + 1,
      bookId: selectedBook.id,
      bookTitle: selectedBook.title,
      ...borrowForm,
      borrowDate: new Date().toISOString().split("T")[0],
      dueDate: new Date(Date.now() + borrowForm.borrowDuration * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
      returnDate: null,
      status: "borrowed",
      fine: 0,
    }

    setBorrowingRecords([...borrowingRecords, borrowRecord])

    // Update book availability
    const updatedBooks = books.map((book) => {
      if (book.id === selectedBook.id) {
        return {
          ...book,
          availableCopies: book.availableCopies - 1,
          borrowedCopies: book.borrowedCopies + 1,
          status: book.availableCopies - 1 === 0 ? "borrowed" : "available",
        }
      }
      return book
    })
    setBooks(updatedBooks)

    setBorrowForm({
      borrowerName: "",
      borrowerType: "Student",
      borrowerId: "",
      borrowDuration: 14,
    })
    setIsBorrowBookOpen(false)
  }

  // Calculate library statistics
  const totalBooks = books.reduce((sum, book) => sum + book.totalCopies, 0)
  const availableBooks = books.reduce((sum, book) => sum + book.availableCopies, 0)
  const borrowedBooks = books.reduce((sum, book) => sum + book.borrowedCopies, 0)
  const overdueBooks = borrowingRecords.filter((record) => record.status === "overdue").length

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Library Management</h1>
          <p className="text-muted-foreground">Manage books, track borrowing, and maintain library inventory</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button variant="outline" size="sm">
            <Upload className="h-4 w-4 mr-2" />
            Import
          </Button>
          <Dialog open={isAddBookOpen} onOpenChange={setIsAddBookOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Book
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Add New Book</DialogTitle>
                <DialogDescription>Add a new book to the library inventory</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Title *</Label>
                    <Input
                      id="title"
                      value={newBook.title}
                      onChange={(e) => setNewBook({ ...newBook, title: e.target.value })}
                      placeholder="Enter book title"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="author">Author *</Label>
                    <Input
                      id="author"
                      value={newBook.author}
                      onChange={(e) => setNewBook({ ...newBook, author: e.target.value })}
                      placeholder="Enter author name"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="isbn">ISBN</Label>
                    <Input
                      id="isbn"
                      value={newBook.isbn}
                      onChange={(e) => setNewBook({ ...newBook, isbn: e.target.value })}
                      placeholder="Enter ISBN"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="publicationDate">Publication Date</Label>
                    <Input
                      id="publicationDate"
                      type="date"
                      value={newBook.publicationDate}
                      onChange={(e) => setNewBook({ ...newBook, publicationDate: e.target.value })}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="genre">Genre</Label>
                    <Select value={newBook.genre} onValueChange={(value) => setNewBook({ ...newBook, genre: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select genre" />
                      </SelectTrigger>
                      <SelectContent>
                        {genres.map((genre) => (
                          <SelectItem key={genre} value={genre}>
                            {genre}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="totalCopies">Total Copies</Label>
                    <Input
                      id="totalCopies"
                      type="number"
                      min="1"
                      value={newBook.totalCopies}
                      onChange={(e) => setNewBook({ ...newBook, totalCopies: Number.parseInt(e.target.value) })}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    value={newBook.location}
                    onChange={(e) => setNewBook({ ...newBook, location: e.target.value })}
                    placeholder="e.g., A-101, B-205"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={newBook.description}
                    onChange={(e) => setNewBook({ ...newBook, description: e.target.value })}
                    placeholder="Enter book description"
                    rows={3}
                  />
                </div>
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setIsAddBookOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddBook}>Add Book</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Books</CardTitle>
            <Library className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalBooks}</div>
            <p className="text-xs text-muted-foreground">{books.length} unique titles</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Available</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{availableBooks}</div>
            <p className="text-xs text-muted-foreground">Ready to borrow</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Borrowed</CardTitle>
            <BookOpen className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{borrowedBooks}</div>
            <p className="text-xs text-muted-foreground">Currently out</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Overdue</CardTitle>
            <AlertCircle className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{overdueBooks}</div>
            <p className="text-xs text-muted-foreground">Need attention</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="books">Books</TabsTrigger>
          <TabsTrigger value="borrowing">Borrowing</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="books" className="space-y-4">
          {/* Search and Filters */}
          <div className="flex items-center space-x-4">
            <div className="relative flex-1">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search books by title, author, ISBN, or tags..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8"
              />
            </div>
            <Select value={selectedGenre} onValueChange={setSelectedGenre}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="All Genres" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Genres</SelectItem>
                {genres.map((genre) => (
                  <SelectItem key={genre} value={genre}>
                    {genre}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="All Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="available">Available</SelectItem>
                <SelectItem value="borrowed">Borrowed</SelectItem>
                <SelectItem value="reserved">Reserved</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Books Grid */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredBooks.map((book) => (
              <Card key={book.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="space-y-1 flex-1">
                      <CardTitle className="text-lg leading-tight">{book.title}</CardTitle>
                      <CardDescription>by {book.author}</CardDescription>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem
                          onClick={() => {
                            setSelectedBook(book)
                            setIsViewBookOpen(true)
                          }}
                        >
                          <Eye className="mr-2 h-4 w-4" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => {
                            setSelectedBook(book)
                            setIsEditBookOpen(true)
                          }}
                        >
                          <Edit className="mr-2 h-4 w-4" />
                          Edit Book
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          onClick={() => {
                            setSelectedBook(book)
                            setIsBorrowBookOpen(true)
                          }}
                          disabled={book.availableCopies === 0}
                        >
                          <BookOpen className="mr-2 h-4 w-4" />
                          Borrow Book
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Bookmark className="mr-2 h-4 w-4" />
                          Reserve Book
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-red-600">
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete Book
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    {getStatusBadge(book.status)}
                    <Badge variant="outline">{book.genre}</Badge>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Available:</span>
                      <span className="font-medium">
                        {book.availableCopies}/{book.totalCopies}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Location:</span>
                      <span className="font-medium">{book.location}</span>
                    </div>
                  </div>

                  {book.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {book.tags.slice(0, 3).map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                      {book.tags.length > 3 && (
                        <Badge variant="secondary" className="text-xs">
                          +{book.tags.length - 3}
                        </Badge>
                      )}
                    </div>
                  )}

                  <p className="text-sm text-muted-foreground line-clamp-2">{book.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="borrowing" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Borrowing Records</CardTitle>
              <CardDescription>Track all book borrowing and return activities</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Book</TableHead>
                    <TableHead>Borrower</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Borrow Date</TableHead>
                    <TableHead>Due Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Fine</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {borrowingRecords.map((record) => (
                    <TableRow key={record.id}>
                      <TableCell className="font-medium">{record.bookTitle}</TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">{record.borrowerName}</div>
                          <div className="text-sm text-muted-foreground">{record.borrowerId}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{record.borrowerType}</Badge>
                      </TableCell>
                      <TableCell>{record.borrowDate}</TableCell>
                      <TableCell>{record.dueDate}</TableCell>
                      <TableCell>
                        {record.status === "borrowed" && (
                          <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">Borrowed</Badge>
                        )}
                        {record.status === "overdue" && (
                          <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Overdue</Badge>
                        )}
                        {record.status === "returned" && (
                          <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Returned</Badge>
                        )}
                      </TableCell>
                      <TableCell>{record.fine > 0 ? `$${record.fine.toFixed(2)}` : "-"}</TableCell>
                      <TableCell>
                        {record.status !== "returned" && (
                          <Button size="sm" variant="outline">
                            Return Book
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Popular Genres</CardTitle>
                <CardDescription>Most borrowed book genres</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {["Fiction", "Science Fiction", "Romance", "Mystery"].map((genre, index) => (
                    <div key={genre} className="flex items-center justify-between">
                      <span className="text-sm font-medium">{genre}</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-20 bg-gray-200 rounded-full h-2">
                          <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${(4 - index) * 25}%` }}></div>
                        </div>
                        <span className="text-sm text-muted-foreground">{(4 - index) * 25}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Borrowing Trends</CardTitle>
                <CardDescription>Monthly borrowing statistics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {["January", "February", "March", "April"].map((month, index) => (
                    <div key={month} className="flex items-center justify-between">
                      <span className="text-sm font-medium">{month}</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-20 bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-green-600 h-2 rounded-full"
                            style={{ width: `${(index + 1) * 20}%` }}
                          ></div>
                        </div>
                        <span className="text-sm text-muted-foreground">{(index + 1) * 15} books</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* View Book Dialog */}
      <Dialog open={isViewBookOpen} onOpenChange={setIsViewBookOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          {selectedBook && (
            <>
              <DialogHeader>
                <DialogTitle>{selectedBook.title}</DialogTitle>
                <DialogDescription>by {selectedBook.author}</DialogDescription>
              </DialogHeader>
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-4">
                    <div>
                      <Label className="text-sm font-medium text-muted-foreground">ISBN</Label>
                      <p className="text-sm">{selectedBook.isbn}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-muted-foreground">Publication Date</Label>
                      <p className="text-sm">{selectedBook.publicationDate}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-muted-foreground">Genre</Label>
                      <p className="text-sm">{selectedBook.genre}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-muted-foreground">Location</Label>
                      <p className="text-sm">{selectedBook.location}</p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <Label className="text-sm font-medium text-muted-foreground">Status</Label>
                      <div className="mt-1">{getStatusBadge(selectedBook.status)}</div>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-muted-foreground">Availability</Label>
                      <p className="text-sm">
                        {selectedBook.availableCopies}/{selectedBook.totalCopies} copies available
                      </p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-muted-foreground">Borrowed</Label>
                      <p className="text-sm">{selectedBook.borrowedCopies} copies</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-muted-foreground">Reserved</Label>
                      <p className="text-sm">{selectedBook.reservedCopies} copies</p>
                    </div>
                  </div>
                </div>

                {selectedBook.tags.length > 0 && (
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">Tags</Label>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {selectedBook.tags.map((tag) => (
                        <Badge key={tag} variant="secondary">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                <div>
                  <Label className="text-sm font-medium text-muted-foreground">Description</Label>
                  <p className="text-sm mt-2">{selectedBook.description}</p>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Borrow Book Dialog */}
      <Dialog open={isBorrowBookOpen} onOpenChange={setIsBorrowBookOpen}>
        <DialogContent>
          {selectedBook && (
            <>
              <DialogHeader>
                <DialogTitle>Borrow Book</DialogTitle>
                <DialogDescription>
                  Borrow "{selectedBook.title}" by {selectedBook.author}
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="borrowerName">Borrower Name *</Label>
                  <Input
                    id="borrowerName"
                    value={borrowForm.borrowerName}
                    onChange={(e) => setBorrowForm({ ...borrowForm, borrowerName: e.target.value })}
                    placeholder="Enter borrower name"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="borrowerType">Borrower Type</Label>
                    <Select
                      value={borrowForm.borrowerType}
                      onValueChange={(value) => setBorrowForm({ ...borrowForm, borrowerType: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Student">Student</SelectItem>
                        <SelectItem value="Teacher">Teacher</SelectItem>
                        <SelectItem value="Staff">Staff</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="borrowerId">Borrower ID *</Label>
                    <Input
                      id="borrowerId"
                      value={borrowForm.borrowerId}
                      onChange={(e) => setBorrowForm({ ...borrowForm, borrowerId: e.target.value })}
                      placeholder="Enter ID"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="borrowDuration">Borrow Duration (days)</Label>
                  <Select
                    value={borrowForm.borrowDuration.toString()}
                    onValueChange={(value) => setBorrowForm({ ...borrowForm, borrowDuration: Number.parseInt(value) })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="7">7 days</SelectItem>
                      <SelectItem value="14">14 days</SelectItem>
                      <SelectItem value="21">21 days</SelectItem>
                      <SelectItem value="30">30 days</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setIsBorrowBookOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleBorrowBook}>Borrow Book</Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
