let app = new Vue({
  el: '#app',
  data: {
    books:{},
    favorites:[],
    loading: false,
    message:'',

    author_name: '',
    publish_date: '',

    image:'',

    // url: '<img src = "https://covers.openlibrary.org/b/id/8225610-S.jpg"/>',
  },


  methods: {
    async searchBooks() {
      try
      {
        this.loading = true;
        const response = await axios.get('https://openlibrary.org/search.json?q=' + this.message);

        this.books = response.data;
        if(this.addImage().isSuccess)
        {
          this.loading = false;
          return true;
        }

      }
      catch (e)
      {
        console.log(e);
        return false;
      }
    },

    async getImage(number, index) {
      try
      {
        this.loading = true;
        const response = await axios.get('https://openlibrary.org/api/books?bibkeys=ISBN:'+ number +'&jscmd=details&format=json');
        const data = response.data;
        console.log(data);
        var img = '<img src = "';
        if(data['ISBN:'+ number].thumbnail_url === undefined)
        {
          img+= " ";
        }
        else
        {
          img += data['ISBN:'+ number].thumbnail_url;
        }

        img += '"/>';
        this.books.docs[index].img_url = img;
        this.loading = false;
        return true;
      }
      catch (e)
      {
        console.log(e);
        this.loading = false;
        return false;
      }
    },

    async addImage()
    {
      var length = this.books.docs.length;
      for(i = 0; i < length; ++i)
      {
        if(this.books.docs[i].isbn)
        {
          if(await this.getImage(this.books.docs[i].isbn[0], i))
          {
            if(i == (length - 1))
            {
              console.log("done");
              return true;
            }
          }
        }
      }

        console.log("hey error");
        return false;
    },


    getBookImg(index)
    {
      console.log(index);
      if(!this.books.docs[index] === undefined)
      {
        console.log(index);
        // return this.books.docs[index].img_url;
      }
      else
      {
        return "";
      }
    },

    updateFilter(book)
    {
      console.log("fav: " + book.fav);
      if(book.fav === undefined || book.fav == false)
      {
        book.fav = true;
        this.favorites.push(book);
      }
      else
      {
        this.favorites.splice(this.favorites.indexOf(book),1);
      }
    }


    // filterUndefined()
    // {
    //   for(i = 0; i < this.books.docs.length; ++i)
    //   {
    //     if(this.books.docs[i].author_name === undefined)
    //     {
    //       this.books.docs.splice(i,1);
    //       --i;
    //     }
    //     else if(this.books.docs[i].first_publish_year === undefined)
    //     {
    //       this.books.docs.splice(i,1);
    //       --i;
    //     }
    //   }
    // },


  },

  // watch:
  // {
  //   docs()
  //   {
  //     console.log("books changed!");
  //   }
  //
  // },

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



  },
});


function editName(name) {
  name.replace('[','');
  name.replace(']','');
  name.replace('""','');

  return name;
}
