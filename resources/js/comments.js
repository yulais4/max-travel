export async function getComment(tag_id)
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


export async function sendComment(tag_id, username, body, X_CSRF_TOKEN){
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