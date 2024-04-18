import axios from "axios";
import { GithubRepository } from "./githubService";

export interface DataSource extends GithubRepository{ }

// const CURRENT_SANDBOX_ID = 'ww9kis'
export const CURRENT_SANDBOX_ID = '24d8ff'
export const mock_source_id = '89b7ab71-cdc3-42b7-8621-be6a40c7c4f5'
// export const mock_source_id = ''

export async function fetchSandboxesData(id:string): Promise<DataSource>{
  try {
    const response = await axios.get('https://codesandbox.io/api/v1/sandboxes/' + id);
    const data = response.data.data;
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
}