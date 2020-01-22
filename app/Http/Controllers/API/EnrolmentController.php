<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Validator;
use App\Enrolment;

class EnrolmentController extends Controller
{
    public function index()
    {
        $enrolments = Enrolment::all()->load(['course', 'lecturer']);

        return response()->json(
          [
              'status' => 'success',
              'data' => $enrolments
          ],
          200);
    }

    public function store(Request $request)
    {
        $course_id = $request->input('course_id', 0);
        $lecturer_id = $request->input('lecturer_id', 0);

        $rules = [
            'date' => 'required|date',
            'time' => 'required|regex:/[0-9]{2}:[0-9]{2}/',
            'status' => 'required|string|in:interested,assigned,associate,career_break',
            'course_id' => 'required|exists:courses,id|unique:enrolments,course_id,NULL,id,lecturer_id,' . $lecturer_id,
            'lecturer_id' => 'required|exists:lecturers,id|unique:enrolments,lecturer_id,NULL,id,course_id,' . $course_id
        ];
        $messages = [
            'course_id.unique' => 'Lecturer is already enrolled on course',
            'lecturer_id.unique' => 'Lecturer is already enrolled on course'
        ];
        $validator = Validator::make($request->all(), $rules, $messages);

        if ($validator->fails()) {
          return response()->json(
            [
              'status' => 'Error: see errors',
              'errors' => $validator->errors()
            ],
            422);
        }

        $enrolment = new Enrolment();
        $enrolment->date = $request->input('date');
        $enrolment->time = $request->input('time');
        $enrolment->status = $request->input('status');
        $enrolment->course_id = $request->input('course_id');
        $enrolment->lecturer_id = $request->input('lecturer_id');
        $enrolment->save();

        return response()->json(
          [
              'status' => 'success',
              'data' => $enrolment
          ],
          200
        );
    }

    public function show($id)
    {
        $enrolment = Enrolment::find($id);

        if ($enrolment === null) {
          $statusMsg = 'Enrolment not found!';
          $statusCode = 404;
        }
        else {
          $enrolment->load(['course', 'lecturer']);
          $statusMsg = 'success';
          $statusCode = 200;
        }

        return response()->json(
          [
              'status' => $statusMsg,
              'data' => $enrolment
          ],
          $statusCode);
    }

    public function update(Request $request, $id)
    {
        $enrolment = Enrolment::find($id);

        if ($enrolment === null) {
          return response()->json(
            [
                'status' => 'Enrolment not found!',
                'data' => null
            ],
            404);
        }

        $course_id = $request->input('course_id', 0);
        $lecturer_id = $request->input('lecturer_id', 0);


        $rules = [
            'date' => 'required|date',
            'time' => 'required|regex:/[0-9]{2}:[0-9]{2}/',
            'status' => 'required|string|in:interested,assigned,associate,career_break',
            'course_id' => 'required|exists:courses,id|unique:enrolments,course_id,'.$id.',id,lecturer_id,' . $lecturer_id,
            'lecturer_id' => 'required|exists:lecturers,id|unique:enrolments,lecturer_id,'.$id.',id,course_id,' . $course_id
        ];
        $messages = [
            'course_id.unique' => 'Lecturer is already enrolled on course',
            'lecturer_id.unique' => 'Lecturer is already enrolled on course'
        ];
        $validator = Validator::make($request->all(), $rules, $messages);

        if ($validator->fails()) {
          return response()->json(
            [
              'status' => 'Error: see below',
              'errors' => $validator->errors()
            ],
            422);
        }

        $enrolment->date = $request->input('date');
        $enrolment->time = $request->input('time');
        $enrolment->status = $request->input('status');
        $enrolment->course_id = $request->input('course_id');
        $enrolment->lecturer_id = $request->input('lecturer_id');
        $enrolment->save();

        return response()->json(
          [
              'status' => 'success',
              'data' => $enrolment
          ],
          200
        );
    }

    public function destroy(Request $request, $id)
    {
        $enrolment = Enrolment::find($id);

        if ($enrolment === null) {
          $statusMsg = 'Enrolment not found!';
          $statusCode = 404;
        }
        else {
          $enrolment->delete();
          $statusMsg = "Enrolment: {$id} deleted";
          $statusCode = 200;
        }

        return response()->json(
          [
              'status' => $statusMsg,
              'data' => null
          ],
          $statusCode);
    }
}
