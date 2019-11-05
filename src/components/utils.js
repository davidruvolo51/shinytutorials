// fetch contribution data from github's api
const loadData = function(){

    // format dates
    const formatTime = function (date) {
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        let dateTime = new Date(date);
        return dateTime.toLocaleString("en-GB", options);
    }

    // create request
    const url = "https://api.github.com/users/davidruvolo51/repos";
    fetch(url).then(response => {

        // handle bad responses
        if (response.ok) {
            return response.json();
        } else {
            return Promise.reject({
                status: response.status,
                statusText: response.statusText
            })
        }

    }).then(data => {

        // pull currently active repos
        let raw = data.filter(d => d.name === "shinyAppTutorials");

        // map json data to new object
        let df = [];
        for (var i = 0; i < raw.length; i++) {
            df.push({
                "repo": raw[i].name,
                "langs": raw[i].language,
                "openIssues": raw[i].open_issues_count,
                "watchers": raw[i].watchers_count,
                "stargazers": raw[i].stargazers_count,
                "forks": raw[i].forks_count,
                "created": formatTime(raw[i].created_at),
                "updated": formatTime(raw[i].updated_at),
            });
        }

        console.dir(df)
        // this.setState({ github: df })

    }).catch(error => {

        // throw error
        console.log(error);
    })
}

// <Section className="get-involved" aria-label="get involved">
///<h2>Get Involved</h2>
///<p>Any comments, questions, or suggestions for improvement are warmly welecomed. Open a new issue by visiting the <a href="https://github.com/davidruvolo51/shinyAppTutorials">Shiny Tutorials</a> github repository. Check out the issues and to do list below and get involved!</p>
///</Section>