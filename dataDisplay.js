$(document).ready(()=> {
    function createNode(element) {
        return document.createElement(element);
    }

    let NAME=[], iD=[], pID=[], EMAIL=[];

    fetch('https://jsonplaceholder.typicode.com/comments').then((resp)=>{
        return resp.json()
    }).then((recvd)=>{
        return recvd.map((blck)=>{
            NAME.push(blck.name);
            iD.push(""+blck.id);
            EMAIL.push(blck.email);
            if(pID.indexOf(""+blck.postId)===-1)
                pID.push(""+blck.postId);
            
            let ul = createNode('ul');    
            let post = createNode('li');
            let ID = createNode('li');
            let name = createNode('li');
            let email = createNode('li');
            let body = createNode('li');
            post.innerHTML = "<strong>postId: </strong>"+blck.postId;
            ID.innerHTML = "<strong>id: </strong>"+blck.id;
            name.innerHTML = "<strong>name: </strong>"+blck.name;
            email.innerHTML = "<strong>email: </strong>"+blck.email;
            body.innerHTML = "<strong>body: </strong>"+blck.body;
            ul.appendChild(post);
            ul.appendChild(ID);
            ul.appendChild(name);
            ul.appendChild(email);
            ul.appendChild(body);
            document.getElementById('objs').appendChild(ul);                

        });
    });

    $('#frm').change(()=>{
        let radioVal = $('input[name="filter"]:checked').val();
        if(radioVal==="postId")
        {
            $('#searchBox').attr('type','text');
            $('#searchBox').attr('placeholder','Type in the postId....');
            $('#searchBox').autocomplete({
                source: function(request, response) {
                    var results = $.ui.autocomplete.filter(pID, request.term);
            
                    response(results.slice(0, 10));
                },
                autoFocus: true,
                minLength: 1
            });
        }        
        else if(radioVal==="id")
        {
            $('#searchBox').attr('type','text');
            $('#searchBox').attr('placeholder','Type in the id....');
            $('#searchBox').autocomplete({
                source: function(request, response) {
                    var results = $.ui.autocomplete.filter(iD, request.term);
            
                    response(results.slice(0, 10));
                },
                autoFocus: true,
                minLength: 1
            });
        }    
        else if(radioVal==="name")
        {
            $('#searchBox').attr('type','text');
            $('#searchBox').attr('placeholder','Type in the name to search....');
            $('#searchBox').autocomplete({
                source: function(request, response) {
                    var results = $.ui.autocomplete.filter(NAME, request.term);
            
                    response(results.slice(0, 10));
                },
                autoFocus: true,
                minLength: 1
            });
        }    
        else
        {
            $('#searchBox').attr('type','email');
            $('#searchBox').attr('placeholder','xyz@abc.lkj');
            $('#searchBox').autocomplete({
                source: function(request, response) {
                    var results = $.ui.autocomplete.filter(EMAIL, request.term);
            
                    response(results.slice(0, 10));
                },
                autoFocus: true,
                minLength: 1
            });
        }
    });  



    $("button").click(()=> {
        $('ul').empty();
        let toBeSearched = document.getElementById('searchBox').value;
        let radioVal = $('input[name="filter"]:checked').val();
        console.log(typeof(toBeSearched));
        let url = 'https://jsonplaceholder.typicode.com/comments?'+radioVal+'='+toBeSearched;
        console.log(url);
        fetch(url).then((response)=>{
            return response.json()
        }).then((received)=>{
            return received.map(function(block) {
            let ul = createNode('ul');    
            let post = createNode('li');
            let ID = createNode('li');
            let name = createNode('li');
            let email = createNode('li');
            let body = createNode('li');
            post.innerHTML = "<strong>postId: </strong>"+block.postId;
            ID.innerHTML = "<strong>id: </strong>"+block.id;
            name.innerHTML = "<strong>name: </strong>"+block.name;
            email.innerHTML = "<strong>email: </strong>"+block.email;
            body.innerHTML = "<strong>body: </strong>"+block.body;
            ul.appendChild(post);
            ul.appendChild(ID);
            ul.appendChild(name);
            ul.appendChild(email);
            ul.appendChild(body);
            document.getElementById('objs').appendChild(ul);
            })
        }).catch(function(error) {
            console.log(error);
        });
    });
});