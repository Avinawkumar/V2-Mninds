const readline = require('readline');

class Shape {
  constructor(type, alignment, drawWith, rows, columns) {
    this.type = type;
    this.alignment = alignment;
    this.drawWith = drawWith;
    this.rows = rows;
    this.columns = columns;
  }

validate() {
    const validTypes = ['triangle', 'square', 'rectangle'];
    const validAlignments = ['left', 'center', 'right'];

    if (!validTypes.includes(this.type.toLowerCase())) {
      throw new Error('Invalid shape type');
    }

    if (!validAlignments.includes(this.alignment.toLowerCase())) {
      throw new Error('Invalid alignment');
    }

  }


  draw() {
    try {
      this.validate();
      if (this.type === "triangle") {
        this.drawTriangle();
      } else if (this.type === "square") {
        this.drawSquare();
      } else if (this.type === "rectangle") {
        this.drawRectangle();
      } else {
        throw new Error("Invalid shape type");
      }
    } catch (error) {
      console.error(error.message);
    }
  }

  drawTriangle() {
    let str = "";
    for (let i = 1; i <= this.rows; i++) {
      let line = '';
      const numChars = i * 2 - 1; // Number of characters in the current row
      let padding;

      if (this.alignment === 'left') {
        padding = 0;
      } else if (this.alignment === 'right') {
        padding = this.columns - numChars;
      } else if (this.alignment === 'center') {
        padding = Math.floor((this.columns - numChars) / 2);
      }

      line = ' '.repeat(padding) + this.drawWith.repeat(numChars) + "\n";
      str += line;
    }
    console.log(str);
  }

  drawSquare() {
    let line = '';
    for (let i = 0; i < this.rows; i++) {
      if (this.alignment === 'left') {
        line = this.drawWith.repeat(this.columns);
      } else if (this.alignment === 'right') {
        line = ' '.repeat(this.columns - this.drawWith.length) + this.drawWith.repeat(this.columns);
      } else if (this.alignment === 'center') {
        let spaces = Math.floor((this.columns - this.drawWith.length) / 2);
        line = ' '.repeat(spaces) + this.drawWith.repeat(this.columns);
      }
      console.log(line);
    }
  }

  drawRectangle() {
    let line = '';
    for (let i = 0; i < this.rows; i++) {
      if (this.alignment === 'left') {
        line = this.drawWith.repeat(this.columns);
      } else if (this.alignment === 'right') {
        line = ' '.repeat(this.columns - this.drawWith.length) + this.drawWith.repeat(this.columns);
      } else if (this.alignment === 'center') {
        let spaces = Math.floor((this.columns - this.drawWith.length) / 2);
        line = ' '.repeat(spaces) + this.drawWith.repeat(this.columns);
      }
      console.log(line);
    }
  }
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const askQuestion = (query) => {
  return new Promise((resolve) => {
    rl.question(query, (answer) => {
      resolve(answer);
    });
  });
};

const main = async () => {
  try {
    const type = await askQuestion('Enter shape type (triangle, square, rectangle): ');
    const alignment = await askQuestion('Enter alignment (left, center, right): ');
    const drawWith = await askQuestion('Enter character to draw with: ');
    const rows = parseInt(await askQuestion('Enter number of rows: '));
    const columns = parseInt(await askQuestion('Enter number of columns: '));

    const shape = new Shape(type, alignment, drawWith, rows, columns);
    shape.draw();

    rl.close();
  } catch (error) {
    console.error(error.message);
    rl.close();
  }
};

main();
