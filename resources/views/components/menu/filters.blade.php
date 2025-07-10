<head>
    @vite([
        'resources/css/components/menu/filters.css',
    ])
</head>
<body>
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
          <md-elevated-button     type="submit" id="data-filter-submit">Применить</md-elevated-button>
          <md-elevated-button     type="button" id="data-filter-reset">Reset</md-elevated-button>
          <md-filled-tonal-button type="button" id="data-filter-close">Закрыть</md-filled-tonal-button>
        </div>
      </form>
    </div>
</body>