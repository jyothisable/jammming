let accessToken ='';
const clientId = "fd510668fbe04a44bfa724b6bd29579b";
const redirectUrl = "https://jyothisable-jamming.netlify.app/";

const Spotify = {
    getAccessToken() {
        if (accessToken){
            // console.log(accessToken)
            return accessToken;
        }
        // check for accessToken
        let url = window.location.href
        const accessTokenMatch = url.match(/access_token=([^&]*)/);
        const expiresInMatch = url.match(/expires_in=([^&]*)/);
        
        if (accessTokenMatch && expiresInMatch){
            accessToken = accessTokenMatch[1];
            const expiresIn = Number(expiresInMatch[1])
            // This clears the parameter when expired
            window.setTimeout(() => (accessToken = ""), expiresIn * 1000);
            window.history.pushState("Access Token", null, "/");
            return accessToken
        }
        else{
            const accessUrl =`https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUrl}`;
            window.location = accessUrl;
        }
    },

    search(term){
        const accessToken = Spotify.getAccessToken();
        return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`,{
            headers:{
                Authorization:`Bearer ${accessToken}` 
            }
        }).then(response => response.json()).then(jsonResponse =>{
            if (!jsonResponse.tracks) {
                return []
            }
            return jsonResponse.tracks.items.map(track =>({
                id:track.id,
                name:track.name,
                artist: track.artists[0].name,
                uri:track.uri
            }) )
        })
    },

    savePlaylist(name,trackUris) {
        if (!name || !trackUris.length){
            return;
        }
        const accessToken = Spotify.getAccessToken();
        const headers = {Authorization:`Bearer ${accessToken}`}
        let userId;

        return fetch(`https://api.spotify.com/v1/me`,{headers: headers}
        ).then(response => response.json()
        ).then(jsonResponse => {
            userId = jsonResponse.id;
            return fetch(`https://api.spotify.com/v1/users/${userId}/playlists/`,
            {
                headers: headers,
                method:'POST',
                body:JSON.stringify({name:name})
            }).then(response=> response.json()
            ).then(jsonResponse => {
                const playlistId = jsonResponse.id;
                return fetch(`https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks`,
                {
                    headers: headers,
                    method:'POST',
                    body:JSON.stringify({uris:trackUris})
                })
            })
        })

    }
};

export default Spotify