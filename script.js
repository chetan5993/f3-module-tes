   const getIP = () => {
        $.getJSON("https://api.ipify.org?format=json", function (data) {

            // Setting text of element P with id gfg
            $("#ipAddress").html(data.ip);
            // setting up IP Address in local storage
            localStorage.setItem('IP', data.ip);
        })
    }

    let postData = null; // for post offices Array


//  filling postOffice card data 
    const fillPostData = (postArray) => {

        const cardContainer = document.getElementById('card-container');

        cardContainer.innerHTML = '';

        postArray.forEach(item => {

            const card = document.createElement('div')

            card.classList.add('card')

            card.innerHTML = `<div>
                                    <span>Name:</span>
                                    <p id="post-name">${item.Name}</p>
                                </div>
                                <div>
                                    <span>Branch Type:</span>
                                    <p id="branch">${item.BranchType}</p>
                                </div>
                                <div>
                                    <span>Dilivery Status:</span>
                                    <p id="D-Status">${item.DeliveryStatus}</p>
                                </div>
                                <div>
                                    <span>District:</span>
                                    <p id="District">${item.District}</p>
                                </div>
                                <div>
                                    <span class="demo">Division:</span>
                                    <p id="Division">${item.Division}</p>
                                </div>`
            cardContainer.appendChild(card);
        });
        
    }

    // input bar setting for filtering
    const input = document.getElementById('input');

    input.addEventListener('keyup',(e)=>{
        const val = e.target.value.toLowerCase();

        // filtering data name and office wise
        const filteredPost = postData.filter((item)=> item.Name.toLowerCase().includes(val) || item.BranchType.toLowerCase().includes(val) )
        fillPostData(filteredPost)
    })

    // fetching post office data
    const fetchPostData = async (postCode) => {
        try {
            const res = await fetch(`https://api.postalpincode.in/pincode/${postCode}`)
            const data = await res.json();
            postData = data[0].PostOffice
            fillPostData(postData);
        }
        catch (error) {
            console.log(error)
        }
    }

    // filling location data
    const fillData = (data) => {

        const city = document.getElementById('city')
        const lat = document.getElementById('lat')
        const org = document.getElementById('org')
        const long = document.getElementById('long')
        const region = document.getElementById('region')
        const hostName = document.getElementById('host')
        const mapContainer = document.getElementById('map-container')
        const timeZone = document.getElementById('TZ')
        const dateTime = document.getElementById('date-time')
        const pincode = document.getElementById('pincode')
        const message = document.getElementById('msg')

        // setting langitude and longitude for map
        let loc = data.loc ? data.loc.split(',') : ["22.6764", "77.2074"];
        mapContainer.innerHTML = ` <iframe src="https://maps.google.com/maps?q=${loc[0] ? loc[0] : '27.6764'},${loc[1] ? loc[1] : '87.2074'}&z=15&output=embed" width="100%" height="600px"
        id="map" class="map" frameborder="0" style="border:0"></iframe>`

        // filling up empty feilds
        lat.textContent = loc[0];
        long.textContent = loc[1];
        city.textContent = data.city;
        org.textContent = data.org;
        region.textContent = data.region;
        hostName.textContent = data.hostname;
        timeZone.textContent = data.timezone;
        pincode.textContent = data.postal;
        message.textContent = 'Number Of Pincodes Found';


        // setting date and time according to the user timezone
        let date = new Date();
        let Datetime = date.toLocaleString("en-US", { timeZone: data.timeZone });
        dateTime.textContent = Datetime;

        // sendind pincode to fetch data for post office
        fetchPostData(data.postal);
    }


    // fetching location data using IP Address
    const fetchData = async (IP) => {

        try {
            const res = await fetch(`https://ipinfo.io/106.79.187.152?token=f5e17e10e51cec`)
            const data = await res.json();
            // sending data to fill
            fillData(data);
        }
        catch (error) {
            console.log(error)
        }

    }

    // to display the IP Address 
    const showData = () => {
        const IP = localStorage.getItem('IP');
        document.getElementById('ip').textContent = IP;

        //sending IP Address to fetch data 
        fetchData(IP);
    }
