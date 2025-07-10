<head>
    @if ($for_device === 'mobile')
        @vite(['resources/css/components/forms/searchMobile.css'])
    @elseif ($for_device === 'desktop')
        @vite(['resources/css/components/forms/searchDesktop.css'])
    @endif
</head>
<body>
    <form id="search-form" class="row hidden">
        <md-filled-text-field name="input" id="input" placeholder="Enter coords:" required></md-filled-text-field>
        <md-filled-tonal-icon-button id="search-btn"><md-icon><span class="material-symbols-outlined">search</span></md-icon></md-filled-tonal-icon-button>
        <md-filled-tonal-button type="button" id="close-btn">Закрыть</md-filled-tonal-button>
    </form>
</body>