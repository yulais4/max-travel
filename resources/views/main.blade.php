<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Red Zone</title>
  <link
    rel="stylesheet"
    href="https://unpkg.com/leaflet@1.3.1/dist/leaflet.css"
    integrity="sha512-Rksm5RenBEKSKFjgI3a41vrjkw4EVPlJ3+OiI65vTjIdo9brlAacEuKOiQ5OFh7cOI1bkDwLqdLw3Zg0cRJAAQ=="
    crossorigin="" />


  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0" />

  <meta name="csrf-token" content="{{ csrf_token() }}">

  @vite([
    'resources/css/style.css',
    'resources/js/date-filter.js',
    'resources/js/material-import.js'
    ])
</head>
<body>
  <header>
    @include('components.forms.search', ['for_device' => 'desktop'])
    @include('components.menu.topbar')
    </div>
    <!--------------->
    <!--  Фильтры  -->
    <!--------------->
    <!-- Меню фильтров (изначально скрыто) -->
    <div class="filters hidden" id="filters-menu">
      <form id="data-filter">
        <div class="row">
          <div class="row">
            <label for="date-for">Показывать метки от:</label>
            <input type="datetime-local" id="date-for" min="2025-01-01">
          </div>

          <div>
            <label for="date-to">до:</label>
            <input type="datetime-local" id="date-to" min="2025-01-01">
          </div>
        </div>

        <div class="row">
          <md-text-button type="button" id="last-hour-button">За последний час</md-text-button>
          <md-text-button type="button" id="last-day-button">За последний день</md-text-button>
          <md-text-button type="button" id="last-month-button">За последний месяц</md-text-button>
          <md-text-button type="button" id="last-six-month-button">За последние шесть месяцев</md-text-button>
        </div>

        <div class="row action-buttons">
          <md-elevated-button type="submit" id="data-filter-submit">Применить</md-elevated-button>
          <md-elevated-button type="button" id="data-filter-reset">Reset</md-elevated-button>
          <md-filled-tonal-button id="data-filter-close">Закрыть</md-filled-tonal-button>
        </div>
      </form>
    </div>
    
  </header>
  <main>
    <!---------------------->
    <!-- Работа с картами -->
    <!---------------------->
    <div id="map">
      @vite(['resources/js/main.js'])
    </div>
  </main>

  <footer>
    <!--------------------------->
    <!--  Форма создания тега  -->
    <!--------------------------->
    <form class="new-tag-form" id="new-tag-form" name="new-tag-form">

      <legend>Отметте точку или нажмите "Отмена"</legend>

      <div class="row">
        <md-filled-text-field label="Username" name="username" id="username-input" required></md-filled-text-field>
        <md-filled-text-field label="Description" name="description" id="description-input" required></md-filled-text-field>
      </div>

      <div class="row">
        <md-text-button type="button" id="new-tag-cancel-btn">Отмена</md-text-button>
        <md-outlined-button type="submit" id="new-tag-submit-btn">Отправить</md-outlined-button>
      </div>
    </form>

    <nav class="navbar active" id="navbar">
      <md-elevated-button class="navbtn" id="add-tag-btn">➕ Add Tag</md-elevated-button>
      <md-filled-tonal-icon-button id="mygeo-btn"><md-icon><span class="material-symbols-outlined">my_location</span></md-icon></md-filled-tonal-icon-button>
    </nav>
  </footer>
</body>

  <!--
  --    Marker PopUp
  -->
  <div class="marker-popup hidden" id="marker-popup">
    <h6 id="marker-info"></h6>
    <h5 id="marker-date"></h5>
    <h5 id="merker-type"></h5>
    <h5 id="marker-username"></h5>
    <p id="marker-description"></p>
    <div class="likes row">
      <md-filled-tonal-icon-button id="marker-like-btn"><md-icon><span class="material-symbols-outlined">thumb_up</span></md-icon></md-filled-tonal-icon-button>
      <md-icon-button id="marker-likes-counter">0</md-icon-button>
      <md-outlined-icon-button id="marker-dislike-btn"><md-icon><span class="material-symbols-outlined">thumb_down</span></md-icon></md-outlined-icon-button>
    </div>

    <h4><span style="text-decoration: underline">Комментарии:</span></h4>
    <div id="comment-block" class="comment"></div>
    
    <form class="new-tag-comment-form" id="new-tag-comment-form" name="new-tag-comment-form">
      <div class="row">
        <md-filled-text-field label="Username" name="username" id="username-input" required></md-filled-text-field>
        <md-filled-text-field label="Description" name="description" id="description-input" required></md-filled-text-field>
      </div>
      <md-outlined-button type="submit" id="new-tag-submit-btn">Отправить</md-outlined-button>
    </form>
  </div>
</html>