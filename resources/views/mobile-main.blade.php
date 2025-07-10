<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Red Zone</title>
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0" />

  <meta name="csrf-token" content="{{ csrf_token() }}">

  @vite([
    'resources/css/root.css',
    ])
</head>
<body>
  <header>
    @include('components.forms.search', ['for_device' => 'mobile'])
    @include('components.menu.topbar')
    @include('components.menu.filters')
  </header>
  <main>
    @include('components.map')
  </main>
  <footer>
    @include('components.menu.navbar')
    @include('components.forms.new-tag')
    @include('components.menu.bottom-popup')
  </footer>
</html>