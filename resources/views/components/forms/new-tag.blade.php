<head>
    @vite([
        'resources/css/components/forms/newTag.css',
        'resources/js/components/ui/forms/newTag.js'
    ])
</head>
<body>
    <form class="new-tag-form hidden" id="new-tag-form" name="new-tag-form">

    <legend>Отметте точку или нажмите "Отмена"</legend>

      <div class="row">
        <md-text-button type="button" id="new-tag-cancel-btn">Отмена</md-text-button>
        <md-outlined-button type="submit" id="new-tag-submit-btn">Отправить</md-outlined-button>
      </div>
    </form>
</body>