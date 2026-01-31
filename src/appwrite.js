import { Client, ID, Query, TablesDB } from "appwrite"

const PROJECT_ID = import.meta.env.VITE_APPWRITE_PROJECT_ID
const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID
const COLLECTION_ID = import.meta.env.VITE_APPWRITE_COLLECTION_ID

const client = new Client()
  .setEndpoint('https://sgp.cloud.appwrite.io/v1') // Your Appwrite Endpoint
  .setProject(PROJECT_ID) // Your project ID
const database = new TablesDB(client)

export const updateSearchCount = async (searchTerm, movie) => {
  try {
    const result = await database.listRows({
      databaseId: DATABASE_ID, 
      tableId: COLLECTION_ID, 
      queries: [
        Query.equal('searchTerm', searchTerm)
      ]
    }) 

    if (result.total > 0) {
      const row = result.rows[0]
      await database.updateRow({
        databaseId: DATABASE_ID, 
        tableId: COLLECTION_ID, 
        rowId: row.$id,
        data: {
          count: row.count + 1
        }
      })
    } else {
      await database.createRow({
        databaseId: DATABASE_ID, 
        tableId: COLLECTION_ID, 
        rowId: ID.unique(), 
        data: {
          searchTerm: searchTerm,
          count: 1,
          movie_id: movie.imdbID,
          poster_url: movie.Poster
        }
      })
    }
  } catch (error) {
    console.error(error)
  }
}

export const getTrendingMovies = async () => {
  try {
    const result = await database.listRows({
      databaseId: DATABASE_ID, 
      tableId: COLLECTION_ID,
      queries: [
        Query.limit(5),
        Query.orderDesc('count'),
      ]
    })
    return result.rows
  } catch (error) {
    console.error(error)
  }
}