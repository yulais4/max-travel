import { dateForFilter, dateToFilter } from "../components/ui/menu/filters";

export async function get_tags(dateFor='', dateTo='')
{
    if (dateForFilter){
        dateFor = dateForFilter.value
    }
    if (dateToFilter){
        dateTo = dateToFilter.value
    }

    const uri = '/getTags?dateFor=' + dateFor
                                    '&dateTo=' + dateTo


    try {
        const response = await fetch(uri);
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        return await response.json(); // Возвращаем данные в формате JSON
    } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
        throw error; // Пробрасываем ошибку, чтобы можно было обработать её снаружи
    }
}

export async function getComments(tag_id)
{
    let url = '/api/marker/getComments?tag_id=' + tag_id

    try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`Response status: ${response.status}`);
        }
    
        return await response.json();

      } catch (error) {
        console.error(error.message);
      }
}

export async function sendNewTag(lat, lng, username, description, type)
{
    const X_CSRF_TOKEN = document.X_CSRF_TOKEN

    console.log(X_CSRF_TOKEN)
    // Отправка запроса на сервер.
    await fetch('/sendTag', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            'X-CSRF-TOKEN': X_CSRF_TOKEN
        },
        body: JSON.stringify({
            username: username,
            description: description,
            type: type,
            lat: lat,
            lng: lng,
        })
    })
    .catch(error => console.error('Error: ', error));
}

export async function sendComment(tag_id, username, body){
    const X_CSRF_TOKEN = document.X_CSRF_TOKEN

  try {
    const response = await fetch('/api/marker/sendComment', {
      method: "POST",
      headers: {
          "Content-Type": "application/json",
          'X-CSRF-TOKEN': X_CSRF_TOKEN
      },
      body: JSON.stringify({
        tag_id    : tag_id,
        username  : username,
        body      : body
      })
    })
    
    if (!response.ok){
      throw new Error(`Response status: ${response.status}`);
    } else {
      return 0
    }
  }
  catch (error){
    console.error(error.message)
  }
}