<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminController extends Controller
{
    public function dashboard()
    {
        return Inertia::render('Admin/Dashboard', [
            'title' => 'Dashboard'
        ]);
    }
    
    // 管理者
    public function settings()
    {
        return Inertia::render('Admin/Settings', ['title' => '基本設定']);
    }
    
    // 網頁模組
    public function profile()
    {
        return Inertia::render('Admin/Profile', ['title' => '個人資料']);
    }
    
    public function organization()
    {
        return Inertia::render('Admin/Organization', ['title' => '本會資料']);
    }
    
    public function about()
    {
        return redirect()->route('admin.about.index');
    }
    
    public function slider()
    {
        return Inertia::render('Admin/Slider', ['title' => '相片輪播']);
    }
    
    public function albums()
    {
        return redirect()->route('admin.albums.index');
    }
    
    public function albumComments()
    {
        return Inertia::render('Admin/AlbumComments', ['title' => '相片留言']);
    }
    
    public function news()
    {
        return redirect()->route('admin.news.index');
    }
    
    public function memberAnnouncements()
    {
        return Inertia::render('Admin/MemberAnnouncements', ['title' => '會員公告']);
    }
    
    public function clubNews()
    {
        return Inertia::render('Admin/ClubNews', ['title' => '社團新聞']);
    }
    
    public function articles()
    {
        return Inertia::render('Admin/Articles', ['title' => '專欄園地']);
    }
    
    public function topics()
    {
        return Inertia::render('Admin/Topics', ['title' => '主題新知']);
    }
    
    public function downloads()
    {
        return Inertia::render('Admin/Downloads', ['title' => '公文與表單']);
    }
    
    public function faq()
    {
        return Inertia::render('Admin/Faq', ['title' => '常見問題']);
    }
    
    public function directors()
    {
        return Inertia::render('Admin/Directors', ['title' => '理監事(組織)']);
    }
    
    public function links()
    {
        return Inertia::render('Admin/Links', ['title' => '相關連結']);
    }
    
    public function guestbook()
    {
        return Inertia::render('Admin/Guestbook', ['title' => '留言板']);
    }
    
    public function memberCategories()
    {
        return Inertia::render('Admin/MemberCategories', ['title' => '會員分類']);
    }
    
    public function members()
    {
        return Inertia::render('Admin/Members', ['title' => '會員資訊']);
    }
    
    public function partners()
    {
        return Inertia::render('Admin/Partners', ['title' => '夥伴介紹']);
    }
    
    public function products()
    {
        return Inertia::render('Admin/Products', ['title' => '會員商品']);
    }
    
    public function events()
    {
        return redirect()->route('admin.events.index');
    }
    
    public function friendEvents()
    {
        return Inertia::render('Admin/FriendEvents', ['title' => '好友活動']);
    }
    
    public function jobs()
    {
        return Inertia::render('Admin/Jobs', ['title' => '人才招募']);
    }
    
    public function timeline()
    {
        return Inertia::render('Admin/Timeline', ['title' => '本會記事']);
    }
    
    // 會員收費
    public function paymentSettings()
    {
        return Inertia::render('Admin/PaymentSettings', ['title' => '基本設定']);
    }
    
    public function payments()
    {
        return Inertia::render('Admin/Payments', ['title' => '繳費作業']);
    }
    
    public function paymentReports()
    {
        return Inertia::render('Admin/PaymentReports', ['title' => '報表統計']);
    }
    
    // 記帳系統
    public function journal()
    {
        return Inertia::render('Admin/Journal', ['title' => '日記簿']);
    }
    
    public function accounts()
    {
        return Inertia::render('Admin/Accounts', ['title' => '科目']);
    }
    
    // 客服系統
    public function redWhiteCategories()
    {
        return Inertia::render('Admin/RedWhiteCategories', ['title' => '紅白帖分類']);
    }
    
    public function redWhite()
    {
        return Inertia::render('Admin/RedWhite', ['title' => '紅白帖']);
    }
}