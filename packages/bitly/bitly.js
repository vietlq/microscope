Bitly = {};

Bitly.shortenURL = function(url) {
    if (! Meteor.settings.bitly) {
        throw new Meteor.Error(500, 'Please provide a Bitly token in Meteor.settings');
    }

    var shortenResponse = Meteor.http.get(
        "https://api-ssl.bitly.com/v3/shorten?",
        {
            timeout: 5000,
            params: {
                "format": "json",
                "access_token": Meteor.settings.bitly,
                "longUrl": url
            }
        }
    );

    if (shortenResponse.statusCode === 200) {
        var response = shortenResponse.data;
        console.log('Bitly response = ' + JSON.stringify(response));
        return response.data.url;
    } else {
        throw new Meteor.Error(500, "Bitly call failed with error: "
            + shortenResponse.status_txt);
    }
}
