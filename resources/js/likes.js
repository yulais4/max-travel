export async function sendLike(markerId, X_CSRF_TOKEN){
    await fetch('/api/marker/sendLike', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            'X-CSRF-TOKEN': X_CSRF_TOKEN
        },
        body: JSON.stringify({
            markerId: markerId
        })
    })
    .catch(error => console.error('Error: ', error));

    addLocalStorage(markerId, 'like')
}

export async function sendDislike(markerId, X_CSRF_TOKEN){
    await fetch('/api/marker/sendDislike', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            'X-CSRF-TOKEN': X_CSRF_TOKEN
        },
        body: JSON.stringify({
            markerId: markerId
        })
    })
    .catch(error => console.error('Error: ', error));

    addLocalStorage(markerId, 'dislike')
}

function addLocalStorage(markerId, action){
    let localStrData = JSON.parse(localStorage.getItem('markerLikes'))

    localStrData[markerId] = action

    console.log(JSON.stringify(localStrData))
    localStorage.setItem('markerLikes', JSON.stringify(localStrData))
}