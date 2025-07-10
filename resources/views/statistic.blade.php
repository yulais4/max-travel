<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Statistic</title>
</head>
<body>
    <main>
        @foreach ($db_response as $string)
            Date: {{ $string->date }}, action: {{ $string->action }}, 
            counter: {{ $string->counter }} <br />
        @endforeach
    </main>
</body>
</html>