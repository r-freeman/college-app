<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Validator;
use App\Lecturer;

class LecturerController extends Controller
{
    public function index()
    {
        $lecturers = Lecturer::all()->load('enrolments.course');

        return response()->json(
          [
              'status' => 'success',
              'data' => $lecturers
          ],
          200);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:50',
            'address' => 'required|string|max:100',
            'phone' => 'required|string|max:20',
            'email' => 'required|email|max:50|unique:lecturers'
        ]);

        if ($validator->fails()) {
          return response()->json(
            [
              'status' => 'Error: see errors',
              'errors' => $validator->errors()
            ],
            422);
        }

        $lecturer = new Lecturer();
        $lecturer->name = $request->input('name');
        $lecturer->address = $request->input('address');
        $lecturer->phone = $request->input('phone');
        $lecturer->email = $request->input('email');
        $lecturer->save();

        return response()->json(
          [
              'status' => 'success',
              'data' => $lecturer
          ],
          200
        );
    }

    public function show($id)
    {
        $lecturer = Lecturer::find($id);

        if ($lecturer === null) {
          $statusMsg = 'Lecturer not found!';
          $statusCode = 404;
        }
        else {
          $lecturer->load('enrolments.course');
          $statusMsg = 'success';
          $statusCode = 200;
        }

        return response()->json(
          [
              'status' => $statusMsg,
              'data' => $lecturer
          ],
          $statusCode);
    }

    public function update(Request $request, $id)
    {
        $lecturer = Lecturer::find($id);

        if ($lecturer === null) {
          return response()->json(
            [
                'status' => 'Lecturer not found!',
                'data' => null
            ],
            404);
        }
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:50',
            'address' => 'required|string|max:100',
            'phone' => 'required|string|max:20',
            'email' => 'required|email|max:50|unique:lecturers,id,' . $id
        ]);

        if ($validator->fails()) {
          return response()->json(
            [
              'status' => 'Error: see below',
              'errors' => $validator->errors()
            ],
            422);
        }

        $lecturer->name = $request->input('name');
        $lecturer->address = $request->input('address');
        $lecturer->phone = $request->input('phone');
        $lecturer->email = $request->input('email');
        $lecturer->save();

        return response()->json(
          [
              'status' => 'success',
              'data' => $lecturer
          ],
          200
        );
    }

    public function destroy(Request $request, $id)
    {
        $lecturer = Lecturer::find($id);


        if ($lecturer === null) {
          $statusMsg = 'Lecturer not found!';
          $statusCode = 404;
        }
        elseif ($lecturer->enrolments->count() == 0) {
          $lecturer->delete();
          $statusMsg = "Lecturer: {$id} deleted";
          $statusCode = 200;
        }
        else {
          $statusMsg = "Lecturer: {$id} NOT deleted!";
          $statusCode = 422;
        }

        return response()->json(
          [
              'status' => $statusMsg,
              'data' => null
          ],
          $statusCode);
    }
}
