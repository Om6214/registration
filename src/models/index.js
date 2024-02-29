const express = require("express");
const path = require("path");
const hbs = require("hbs")
const app = express();
require("../db/mongodb");

const Register = require("./registers");
const { register } = require("module");

const static_path = path.join(__dirname, "../../public  ");
const template_path = path.join(__dirname,"../../templates/views");
const partial_path = path.join(__dirname,"../../templates/partials");

app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.use(express.static(static_path));
app.set("view engine", "hbs");
app.set("views",template_path);
hbs.registerPartials(partial_path);

app.get("/",(req,res)=>{
  res.render("index");
})

app.get("/register",(req,res)=>{
  res.render("register");
})
app.post("/registers", async(req,res)=>{
  try {
    
    const Password = req.body.password;
    const cPassword = req.body.confirm_password;

    if (Password === cPassword) {
      
      const registerEmployee = new Register({

        Name:req.body.name,
        MobileNumber:req.body.mobile,
        Address:req.body.address,
        Password:req.body.password,
        Confirm_Password:req.body.confirm_password

      })
      const registered = await registerEmployee.save();
      res.status(201).render("index");


    } else {
      res.send("passwords are not matching");
    }

  } catch (error) {
    res.status(400).send(error);
  }
})
app.get("/login",(req,res)=>{
  res.render("login");
})
app.post("/login", async (req, res) => {
  const UserName = req.body.name;
  const Userpassword = req.body.Password;

  try {
    const user = await Register.findOne({ Name: UserName });

    if (user) {
      // If the user exists, check if the password matches
      if (user.Password === Userpassword) {
        return res.status(200).render("enter.hbs");
      } else {
        console.log(user);
        return res.status(401).render("error.hbs", { message: "Incorrect password" });
      }
    } else {
      return res.status(404).render("error.hbs", { message: "User not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).render("error.hbs", { message: "Internal Server Error" });
  }
});

const PORT = process.env.PORT || 5500;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
