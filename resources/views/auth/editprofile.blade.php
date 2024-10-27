@extends('layouts.app')

@section('content')
    <div id="EditProfile" data-user="{{ Auth::user() }}"></div>
@endsection