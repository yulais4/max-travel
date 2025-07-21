<head>
  @vite([
    'resources/css/components/bottomPopup.css',
    'resources/js/components/ui/menu/bottomPopup.js'
    ])
</head>
<body>
  <div class="bottom-popup hidden" id="bottom-popup">
    <div class="row">
      <h6 id="marker-info"></h6>
      <md-filled-tonal-icon-button id="bottom-popup-close-btn"><md-icon>close</md-icon></md-filled-tonal-icon-button>
    </div>
    <div class="row">
      <h5 id="marker-date"></h5>
      <h5 id="merker-type"></h5>
      <h5 id="marker-username"></h5>
    </div>
    <p id="marker-description"></p>
    <div class="likes row hidden">
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
</body>