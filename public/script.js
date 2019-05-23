let app = new Vue({
  el: '#app',
  data: {
    books:{},
    loading: false,
    message:'',

    author_name: '',
    publish_date: '',
  },

  // created() {
  //   this.searchBooks();
  // },

  methods: {
    async searchBooks() {
      try
      {
        this.loading = true;
        const response = await axios.get('https://openlibrary.org/search.json?q=the+lord+of+the+rings');
        const data = response.data;
        this.books = response.data;
        this.loading = false;
        return true;
      }
      catch (e)
      {
        console.log(e);
        this.number = max;
        return false;
      }
    },

    firstImage(object) {
    return object.images[0].image
  },

    getBookInfo(book) {
      result += book.author_name;
      result += book.first_publish_year;
      return result;
    }
  },

  computed: {
    // computeBookInfo(bookNum)
    // {
    //   book = this.books.docs[bookNum];
    //   author_name = book.author_name.at(0);
    //   return author_name;
    // },

    // getImage(isb)
    // {
    //
    // }
  }

});


function editName(name) {
  name.replace('[','');
  name.replace(']','');
  name.replace('""','');

  return name;
}
