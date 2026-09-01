<?php

namespace App\Http\Controllers;

use App\Models\Slider;
use Illuminate\Http\Request;

class PublicSliderController extends Controller
{
    /**
     * Get active sliders for frontend
     */
    public function getActiveSliders(Request $request)
    {
        $language = $request->query('lang', 'TS');
        
        $sliders = Slider::active()
            ->byLanguage($language)
            ->ordered()
            ->get(['id', 'language', 'title', 'image', 'image_alt', 'link', 'width', 'height', 'video_url', 'description']);
        
        return response()->json([
            'success' => true,
            'data' => $sliders
        ]);
    }
}