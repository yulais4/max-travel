<head>
    @vite([
        'resources/css/components/menu/topbar.css',
        'resources/js/components/ui/menu/topbar.js'
    ])
</head>
<body>
    <div class="topbar active" id="topbar">
        <!-- Кнопка для открытия фильтра -->
        <md-elevated-button id="filter-toggle-btn">Фильтры</md-elevated-button>
        <md-elevated-button id="search-toggle-btn">Поиск</md-elevated-button>
    </div>
</body>