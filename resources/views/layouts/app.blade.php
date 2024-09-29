<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>{{ config('app.name', 'Laravel') }}</title>

    <!-- Scripts -->
    <script src="{{ asset('js/app.js') }}" defer></script>

    <!-- Fonts -->
    <link rel="dns-prefetch" href="//fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css?family=Nunito" rel="stylesheet">

    <!-- Styles -->
    <link href="{{ asset('css/app.css') }}" rel="stylesheet">
    
    <script src="https://code.jquery.com/jquery-3.7.1.min.js"
        integrity="sha256-/JqT3SQfawRcv/BIHPThkBvs0OEvtFFmqPF/lYI/Cxo=" crossorigin="anonymous"></script>
</head>
<body>
    <div id="app">
        @auth
            <div id="navbar" data-auth="true" data-role="{{ Auth::user()->user_role }}" data-user="{{ Auth::user() }}">
            </div>
        @endauth
        @guest
            <div id="navbar" data-auth="false">
            </div>
        @endguest
        {{-- <main class="pl-24 pr-16" id="mainContent" style="
        margin-left: 
        @guest
            25px;
        @else
            100px
        @endguest margin-right: 25px">
            @yield('content')
        </main> --}}

        @guest
            <main id="mainContent">
                @yield('content')
            </main>
        @endguest

        @auth
            <main class="pl-24 pr-16" id="mainContent" style="margin-left: 100px; margin-right: 25px">
                @yield('content')
            </main>
        @endauth
    </div>
    <script>
        $(document).ready(() => {
            // FOR OPENING DRAWER
            $(".css-p55zm9-MuiButtonBase-root-MuiIconButton-root").click(() => {
                // console.log($(".MuiDrawer-paperAnchorLeft").width())
                $("#mainContent").stop().animate({
                    marginLeft: 275
                }, 250)
                $("#mainContent").removeClass('pl-24')
            })
            // FOR CLOSING DRAWER
            $(".css-78trlr-MuiButtonBase-root-MuiIconButton-root").click(() => {
                // console.log($(".MuiDrawer-paperAnchorLeft").width())
                $("#mainContent").stop().animate({
                    marginLeft: 100
                }, 250)
            })
        })
    </script>
</body>
</html>
