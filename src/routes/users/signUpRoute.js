const fs = require("fs");
const path = require("path");

const saveUser = user => {
  // получить файл с юзером
  // найти путь папки users
  // сохранить туда файл

  const pathUser = path.join(
    __dirname,
    "../../",
    "db",
    "users",
    `${user.username}.json`
  );

  fs.appendFile(pathUser, JSON.stringify(user), function(err) {
    if (err) throw err;
    console.log("Saved!");
  });
};

const signUpRoute = (request, response) => {
  // Взять данные что пришли
  if (request.method === "POST") {
    let body = "";

    request.on("data", function(data) {
      body += data;

      console.log("Incoming data!!!!");
    });

    request.on("end", function() {
      const post = JSON.parse(body);
      //   console.log(post);
      saveUser(post);

      response.writeHead(201, { "Content-Type": "application/json" });
      response.end(JSON.stringify({ status: "success", user: post }));
    });
  }

  // Взять username с данных, сохранить в переменную

  // Сохраняем данные в <username>.json

  // Сохранить <username>.json в папку users

  // Отправляем файл в ответе с данными юзера
  // использовать response
};

module.exports = signUpRoute;
