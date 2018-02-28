addEventListener("load", function (e) {
    var slugify = function slugify(str) {
        var new_str = str;
        new_str = new_str.trim();
        new_str.replace("/\s+/", "");
        new_str.replace("/ /", "-");
        new_str.replace("/[^A-Za-z0-9-]/", "");
        return new_str;
    };

    var username = "visitor-" + ~~(Math.random() * 100);
    var msgBox = document.querySelector("#msgbox");

    SocketService.init("my-awesome-chat", function (socket) {
        socket.on("room-joined", function (room) {
            console.log("socket joined " + room);

            msgBox.addEventListener("keyup", function (e) {
                if (e.key == "Enter" && slugify(msgBox.value) != "") {
                    socket.emit("newMsg", {
                        username: username,
                        msg: msgBox.value
                    });
                    msgBox.value = "";
                }
            }, false);

            socket.on("newMsg", function (data) {
                console.log(data);
                var msg = document.createElement("div");
                msg.classList.add("msg");

                var content = "";
                if (data.username == username) {
                    msg.classList.add("from-me");
                } else {
                    msg.classList.add("from-other");
                    content += '<span class="username">' + data.username + "</span>:<br>";
                }

                // prevent script injection
                data.msg = data.msg.replace("script", "schript");

                content += data.msg;
                msg.innerHTML = content;

                var row = document.createElement("div");
                row.classList.add("row");
                row.appendChild(msg);
                document.querySelector("#chat").appendChild(row);

                window.scroll({
                    top: document.body.clientHeight,
                    behavior: "smooth"
                });
            });
        });
    });
});