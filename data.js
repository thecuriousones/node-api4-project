const credentials = () => ([
    {
        username: 'thecuriousfew',
        password: 'placestosee'
    },
    {
        username: 'lovingtheworld',
        password: 'nature365'
    },
    {
        username: 'peoplewatching',
        password: 'subwayhopping'
    }
  ])

  // FAKE IN-MEMORY USERS "TABLE"
let users = credentials()

// DATABASE ACCESS FUNCTIONS
const find = () => {
    // SELECT * FROM users;
    return Promise.resolve(users)
  }
  
  const insert = ({ username, password }) => {
    // INSERT INTO users (username, password) VALUES ('foo', 'bar');
    const newUser = { username, password }
    users.push(newUser)
    return Promise.resolve(newUser)
  }

  const login = (username) => {
    // LOGIN checks to see if the username entered is part of the database
    const user = users.find(user => user.username === username)
    if (!user) return Promise.resolve(null)

    const welcomeMessage = "Welcome Back!"
    users = users.map(d => (d.username === username) ? welcomeMessage : d)
    return Promise.resolve(welcomeMessage)
  }
  


module.exports = { credentials, find, insert, login };