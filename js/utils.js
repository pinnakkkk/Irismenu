function showToast(message) {
    var toast = document.getElementById("toast");    
    toast.innerHTML = message;
    toast.classList.add("show", "center"); // Add both classes
    setTimeout(function() {
        toast.classList.remove("show", "center"); // Remove both classes
    }, 3000);
}

export { showToast };