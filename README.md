```markdown
# CHIT-CHAT – A REAL-TIME CHAT APPLICATION 💬

Welcome to **CHIT-CHAT**, a feature-rich, real-time chat application! This project is built using **Node.js**, **Express.js**, **React**, and **Socket.IO**, offering an interactive and responsive user experience.

---

## 🛠 Instructions on How to Run the Server and Client Applications

### 📡 Server Application:
1. Ensure you have Node.js and npm installed on your system.
2. Navigate to the `server` directory in your project.
3. Install the required dependencies by running npm install.

   
   ```
4. Start the server by running npm start.
   ```
5. The server will now be running on the port specified in your environment variables or on port 5000 by default.
   

### 💻 Client Application:
1. Navigate to the `client` directory in your project.
2. Install the required dependencies by running:
   ```bash
   npm install
   ```
3. Start the development server by executing:
   ```bash
   npm start
   ```
4.o	The client application will now be accessible at http://localhost:3000 (or the port specified in your environment variables).

---

## 🏗 Application Architecture and Concurrency

### 🌐 Server-Side:
- **Architecture**: The application follows a client-server architecture using Node.js and Express.js on the server-side, and React on the client-side.
- **Real-time Communication**:The server utilizes Socket.IO for real-time communication and concurrency handling between clients.
- **User Management**:
  - When a client connects, their username is stored in a Map data structure for efficient tracking of connected users.
  - The server ensures unique usernames by finding an available variation if the desired username is already in use.
- **Broadcasting Events**:
  - User join/leave events and chat messages are broadcasted to all connected clients, except the sender.

### 🖥 Client-Side:
- **Framework**: The client application is built using React, a popular JavaScript library for building user interfaces. 
- **Socket.IO Integration**:
  - It connects to the server using the Socket.IO client library, which provides a seamless integration with the server-side Socket.IO implementation. 
  - When a user sends a message, the client emits the message to the server, which then broadcasts it to all other connected clients
- **Real-time Updates**:
  - Received messages from other clients are displayed in real-time on the user interface, providing a responsive and interactive chat experience. 
- **Responsiveness**: The client-side application is responsible for rendering the chat interface, handling user input, and managing the local state of the chat session.

---

## 🎨 Assumptions and Design Choices

### 🎨 CSS Styling:
-	The provided CSS code follows a modern, responsive design approach with a clean and visually appealing user interface
  
- **Color Scheme**: The application uses a consistent color scheme, with a gradient-based background and contrasting colors for various UI elements. elements.
- Styling is applied using class names to maintain modularity and ensure easy maintainability of the codebase
- **Layout**: The CSS code utilizes flexbox layout to create a well-structured and responsive chat interface.
- Modular **class-based styling** ensures easy maintainability.

### 🖌 User Interface Design:

1. **Views**:
o	The application has three main views: the connection container, the login container, and the chat application.
   - **Connection Container**: o	The connection container is used to display a message when the client is not connected to the server.
   - **Login Container**: o	The login container provides a simple login form for users to enter their username and join the chat.
   - **Chat Application**:
     - The chat application view is the main interface where users can send and receive messages.
     - Displays the online user list and includes a button to leave the chat.
       
2. **Sections**:
o	The chat interface is divided into distinct sections, such as the header, message container, online users panel, and message input, to create a clear and organized user experience.
   - **Header**: Shows the number of online users.
   - **Message Container**: Displays real-time chat messages.
   - **Online Users Panel**: Lists all connected users.
   - **Message Input**: For sending new messages.

### 🤝 User Experience:
o	The application prioritizes a smooth and intuitive user experience, with features like: 
- **Responsive Design**: Responsive and adaptive design to ensure a good experience across different screen sizes.
- **Interactive Elements**: Hover effects and animations to provide visual feedback on interactive elements.
- **Form Styling**: Form input styling with focus states to enhance the overall interaction..
- **Consistent Design**: Consistent use of spacing, typography, and color schemes to maintain a coherent look and feel.
  
---

## ⚙️ Core Functionality
o	The application focuses on the core functionality of a real-time chat application, which includes: 

- Allowing users to join the chat by entering a unique username.
- Displaying the current number of online users in the header.
- Enabling users to send and receive messages in real-time.
- Showing a list of online users in a dedicated panel.
- Providing a button to allow users to leave the chat.
---

## 📚 Technical Considerations

- **CSS Code**:
  -The CSS code is well-organized and follows best practices, such as using consistent naming conventions, effectively using selectors, and maintaining a clear separation of concerns.
- **Design Elements**:
  - The use of linear gradients, box shadows, and border radius creates a visually appealing and modern aesthetic for the application.
  - The choice of fonts, font sizes, and line heights contribute to the overall readability and visual hierarchy of the interface.
- **Responsive Design**: 
  - The code demonstrates a good understanding of CSS fundamentals, including layout, positioning, colors, typography, and responsive design techniques.

---

## 🔧 Extensibility and Maintainability

- The modular structure of the CSS code, with clearly defined class names and styles, allows for easy extension and modification of the UI in the future
- The consistent use of a color scheme and design patterns throughout the application makes it easier to maintain a cohesive visual identity
- The separation of concerns between the different views (connection, login, and chat) ensures that the codebase remains organized and scalable as the application grows in complexity.

---

## 🌟 Features Highlight

- Real-time communication using **Socket.IO**.
- Unique username handling with intelligent suggestions.
- Responsive and user-friendly UI designed with **React**.
- Clean, modern aesthetics powered by advanced CSS techniques.

---
---

**Author**: Poornika Sharma
```
