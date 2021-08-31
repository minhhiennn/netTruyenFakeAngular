function myTest(url, index, indexM) {
    if (index <= indexM) {
        fetch(`${url}/(${index}).jpg`, {method: 'get', headers: { 
            'Content-Type': 'text/plain', 'X-My-Custom-Header': 'value-v', 'Authorization': 'Bearer ' + localStorage.getItem('token') }
        })
            .then(res => { return res.blob() }).then(blob => {
                var img = URL.createObjectURL(blob); document.getElementById('img' + index).setAttribute('src', img);
                myTest(url, index + 1, indexM)
            }).catch((error) => {
                console.log(error, index)
                myTest(url, index + 1, indexM)
            });
    }

}

