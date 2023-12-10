function skillmembers() {
    var skill = document.getElementById("skill").value;
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {

            document.getElementById("skillmembers").innerHTML = this.responseText;
        }
    };
    xhttp.open("GET", "skillmembers.php?skill=" + skill, true);
    xhttp.send();
}