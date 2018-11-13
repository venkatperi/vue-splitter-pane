//  Copyright 2018, Venkat Peri.
//
//  Permission is hereby granted, free of charge, to any person obtaining a
//  copy of this software and associated documentation files (the
//  "Software"), to deal in the Software without restriction, including
//  without limitation the rights to use, copy, modify, merge, publish,
//  distribute, sublicense, and/or sell copies of the Software, and to permit
//  persons to whom the Software is furnished to do so, subject to the
//  following conditions:
//
//  The above copyright notice and this permission notice shall be included
//  in all copies or substantial portions of the Software.
//
//  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
//  OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
//  MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
//  NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
//  DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
//  OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
//  USE OR OTHER DEALINGS IN THE SOFTWARE.

const App = Vue.extend( {
  name: 'test',

  data: function () {
    return {
      sizeA: 0,
      sizeB: 0,
      sizeD: 0,
      thicknessA: 9,
      thicknessB: 9,
      thicknessC: 9,

      thickness: 9,
      options: [
        { value: 3, text: '3' },
        { value: 5, text: '5' },
        { value: 7, text: '7' },
        { value: 9, text: '9' },
        { value: 11, text: '11' },
      ]
    }
  },

  methods: {
    resizeA([a,b]) {
      this.sizeA = `${a}px x ${b}px`
    },
    resizeB([a,b]) {
      this.sizeB = `${a}px x ${b}px`
    },
    resizeD([a,b]) {
      this.sizeD = `${a}px x ${b}px`
    }
  },
} )

new App().$mount( '#app' )

