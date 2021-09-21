
import { API_KEY, formartDate } from "../utlis";

export async function getDataAction(start_date, end_date) {
    const res = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${API_KEY}&start_date=${formartDate(start_date)}&end_date=${formartDate(end_date)}`);

    if (res?.status === 200) {
        return ((await res.json()).filter(item => item?.media_type === "image").reverse());
    }
    return [];
}
