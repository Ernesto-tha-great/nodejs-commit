  
//http module for server
const http = require('http');
const PORT = 8080;

//querystring module to parse the user response.
const { parse } = require('querystring');
//file system module to create a new file.
const fs = require('fs');
const server = http.createServer((req, res) => {

    if (req.method === 'POST'){
        //to handle the post requests.
        let body = '';

        req.on('data', chunk => {
            body += chunk.toString();
        });

        req.on('end', () => {
            var parsedJson = parse(body);

            // console.log(parsedJson.fname);

            var userFile = parsedJson.firstname;

            var textToFill = `This is the details of our new client. Name: ${userFile}. PassWord: ${parsedJson.password}. Email: ${parsedJson.email}. Number: ${parsedJson.number}`;



            fs.writeFile('./message', textToFill, (err)=> {
                console.log('Data collated');
            })
        
            res.end('congratulations ' + parsedJson.firstname  + '  '   + 'you have successfully signed up');
        })
    } else {
        res.end(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Sign up</title>
            <style>
              header{
            font-family: cursive;
            text-align: center;
           
            padding: 40px 20px;
            border-radius: 5px;
        }
        body{
            background-image: url('sofa.jpeg');
            color: green;
            font-family: cursive;
           font-weight: bold;
            
        }
        h1{
            color: rgb(245, 68, 68);
            font-weight: bold;
        }
        
        .forms{
            text-align: justify;
            padding-top: 20px;
            float: left;
        
        }
        
        /*.set{
         padding: 220px 0px 0px 0px;
        }*/
        
        input{
            border-radius: 5px;
            padding: 5px 10px 8px 10px;
            color: white;
              background-color: skyblue;
              text-align: justify;
        }
        #lname{
            padding-right: 20px;
        }
        .sdf{
            background-color: royalblue;
        }
        select{
            background-color: skyblue;
        }
        .sdf:hover{
            animation-iteration-count: infinite;
            animation-name: background;
            animation-duration: 500ms;
            animation-delay: 1s;
            animation-fill-mode: forwards;
        }
        @keyframes background{
            25%{
                background-color: cyan;
                color: red;
             }
             50%{
                background-color: salmon;
                color: white;
             }
             100%{
                background-color: seagreen;
                color:white;
             }
        }
            </style>
        </head>
        <body>
            <header>
                <h1><strong> Welcome To The Bulaveur Health Blog</strong></h1>
            </header>
            <div class="forms">
        <form action="" method="POST">
          <p>  <label for="fname" class="a"> First Name</label>
            <input type="text" id="fname" name="firstname" placeholder="John"></p>
        
        
        
        
           <p> <label for="tel" class="c">Phone number</label>
            <input type="number" id="tel" name="number" placeholder="+2341234567890"></p>
        
           <p> <label for="email">Email</label>
            <input type="email" name="email" id="email" placeholder="johndoe@gmail.com"></p>
        
          <p>  <label for="pass">Password</label>
            <input type="password" name="password" id="pass"></p>
      
      
        
            <input type="submit" value="Sign up" class="sdf" value="submit" >
        </form>
            </div> 
        
        
        </div>
        
        
            
        </body>
        </html>
    `);
    }
  
});
server.listen(PORT, ()=>  console.log(`This server is being hosted on port ${PORT}`));
