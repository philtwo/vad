# Valorant Agent Dashboard

This is a web application built with Next.js and TypeScript that displays a list of Valorant agents. Users can filter agents by their roles (e.g., Duelist, Sentinel, etc.) using a dropdown menu. The app fetches data from the Valorant API and processes it to display all agents.

---

## Features

- **Agent Listing**: Displays a list of all Valorant agents with their names, roles, and icons.
- **Role Filtering**: Allows users to filter agents by their roles using a dropdown menu.
- **Dynamic Data Fetching**: Fetches agent data from the Valorant API and processes it to remove duplicates and non-playable characters.

---

## Technologies Used

- **Next.js**: Framework for building the application.
- **TypeScript**: For a better developer experience.
- **React**: For building the UI components.
- **CSS**: For styling the application.

---

## Installation and Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/valorant-agent-dashboard.git
   cd valorant-agent-dashboard
   ```

2. Install Dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```
4. Open your browser and navigate to:
   `http://localhost:3000`

---

## How It Works

1.  **Data Fetching** <br>
    The app fetches agent data from the Valorant API using the API route defined in `app/api/agents/route.ts.` The data is filtered to include only playable characters and remove duplicates using the filter `isPlayableCharacter=true`.

2.  **Role Filtering** <br>
    The `RoleFilter` component in `app/components/RoleFilter.tsx`:

    - Displays a dropdown menu with unique roles.
    - Filters the list of agents based on the selected role.

3.  **TypeScript Interfaces** <br>
    The `app/types/valorant.ts` file defines the structure of the data:

    - `ValorantAgent`: Represents an agent with properties like `uuid`, `displayName`, `role`, etc.
    - `ValorantApiResponse`: Represents the structure of the API response.

---

## Acknowledgments

- [Valorant API](https://valorant-api.com/) for providing the agent data.
- The Riot Games team for creating Valorant.
