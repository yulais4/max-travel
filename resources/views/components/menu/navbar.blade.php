<head>
    @vite([
        'resources/css/components/navbar.css'
    ])
</head>
<body>
    <nav class="navbar" id="navbar">
        <md-elevated-button type="button" class="navbtn" id="add-tag-btn">➕ Add Tag</md-elevated-button>
        <md-filled-tonal-icon-button id="mygeo-btn"><md-icon><span class="material-symbols-outlined">my_location</span></md-icon></md-filled-tonal-icon-button>
    </nav>
</body>