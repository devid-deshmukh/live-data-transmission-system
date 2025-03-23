# Live Data Transmission System

This project is a **Live Data Transmission System** that demonstrates real-time data updates using **React**, **Socket.io**, and **Supabase**. It includes a server-side implementation for data generation and storage, and a client-side implementation for displaying the data.

---

## Features

- Real-time data updates using **Socket.io**.
- Data persistence with **Supabase**.
- Modular and reusable UI components built with **React**.
- Styled using **TailwindCSS**.
- Form handling with **React Hook Form**.
- Type-safe validation with **Zod**.

---

## Website Preview

Below is a preview of the website:

<video controls width="100%">
    <source src="./assets/website-preview.mp4" type="video/mp4">
    Your browser does not support the video tag.
</video>

---

## Prerequisites

Before running the project, ensure you have the following installed:

- **Node.js** (v18 or higher)
- **npm** or **yarn**
- A **Supabase** account and project

---

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/devid-deshmukh/live-data-transmission-system.git
   cd live-data-transmission-system
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables:
   - Create a `.env` file in the root directory.
   - Add the following variables:
     ```env
     SUPABASE_URL=your_supabase_url
     SUPABASE_KEY=your_supabase_key
     ```

---

## Usage

### Running the Server

1. Navigate to the `server` directory:

   ```bash
   cd server
   ```

2. Start the server:

   ```bash
   node index.js
   ```

3. The server will run on `http://localhost:5000`.

### Running the Client

1. Navigate back to the root directory:

   ```bash
   cd ..
   ```

2. Start the development server:

   ```bash
   npm run dev
   ```

3. Open your browser and navigate to `http://localhost:3000`.

---

## Project Structure

### Server

- **`server/index.js`**: Contains the Express server and Socket.io setup.
- **Supabase Integration**: Handles data persistence.

### Client

- **`components/ui`**: Reusable UI components (e.g., `Breadcrumb`, `Alert`, `Drawer`).
- **`hooks/use-toast.js`**: Custom hook for toast notifications.
- **`pages`**: Contains the main application pages.

---

## Commands

- Install dependencies:
  ```bash
  npm install
  ```
- Start the development server:
  ```bash
  npm run dev
  ```
- Build the project:
  ```bash
  npm run build
  ```
- Start the production server:
  ```bash
  npm start
  ```

---

## Technologies Used

- **React**: Frontend framework
- **Socket.io**: Real-time communication
- **Supabase**: Backend as a service
- **TailwindCSS**: Styling
- **React Hook Form**: Form handling
- **Zod**: Schema validation

---

## Contributing

1. Fork the repository.
2. Create a new branch:
   ```bash
   git checkout -b feature-name
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add feature"
   ```
4. Push to the branch:
   ```bash
   git push origin feature-name
   ```
5. Open a pull request.

---

## License

This project is licensed under the **ISC License**.

---

## Acknowledgments

- **Supabase** for providing an easy-to-use backend.
- **Socket.io** for enabling real-time communication.
- **React** for its component-based architecture.

---

## Troubleshooting

- If you encounter issues with Supabase, ensure your API keys are correct.
- For Socket.io errors, verify that the server is running and accessible.

---

## Contact

For questions or support, please open an issue on the [GitHub repository](https://github.com/devid-deshmukh/live-data-transmission-system/issues).
