@extends('layouts.app')

@section('content')
    <div id="UserManagement" data-user="{{ Auth::user() }}"></div>
@endsection