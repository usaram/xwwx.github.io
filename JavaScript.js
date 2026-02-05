<script>
fetch("https://discord-backend-1.onrender.com/contador")
  .then(r => r.json())
  .then(data => {
    document.getElementById("views").innerText = data.views;
  });
</script>
