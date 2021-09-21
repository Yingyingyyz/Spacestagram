//1.The default image resource list takes data from the last 30 days of the day
export const monthTimestamp = 2592000000


//api_key
export const API_KEY = '4jThRkUQuUnHrygjtR6hjekFuGKjmHjebmSX1HA8';


//Time and date format reset yyyy-MM-dd
export const formartDate = (date) => {
  try {
    return date.toISOString().substring(0, 10);
  } catch (e) {
    console.error(new Error('Invalid time !'))
  }
}