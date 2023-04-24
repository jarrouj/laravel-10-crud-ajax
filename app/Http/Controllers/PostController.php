<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;

class PostController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $posts = Post::orderBy('id', 'desc')->get();
        return view('posts.index', compact('posts'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request)
    {

    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $post = Post::updateOrCreate(
            [
                'id' => $request->postId
            ],
            [
                'title' => $request->title,
                'description' => $request->description
            ]
        );

        if ($post) {
            return response()->json(['status' => 'success', 'data' => $post]);
        }
        return response()->json(['status' => 'failed', 'message' => 'Failed! Post not created']);
    }

    /**
     * Display the specified resource.
     */
    public function show(Post $post)
    {
        if ($post) {
            return response()->json(['status' => 'success', 'data' => $post]);
        }
        return response()->json(['status' => 'failed', 'message' => 'No post found']);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Request $request,Post $post)
    {


    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Post $post)
    {
        $post->title = $request->title;
        $post->description = $request->description;
        $post->save();
        return response()->json(['status' => 'success', 'data' => $post]);
    }


    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Post $post)
    {
        $post->delete();
        return response()->json(['status' => 'success', 'data' => $post]);
    }
}
