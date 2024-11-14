@extends('layouts.app')

@section('content')

    <div id="HomePage" data-user="{{ Auth::user() }}"></div>

@endsection
