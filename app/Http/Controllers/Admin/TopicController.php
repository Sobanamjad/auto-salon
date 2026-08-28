<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\TopicRequest;
use App\Models\Topic;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TopicController extends Controller
{
    public function index()
    {
        $topics = Topic::active()
            ->ordered()
            ->paginate(20);

        return Inertia::render('Admin/topics/Topics', [
            'title' => '專業主題新知',
            'topics' => $topics,
            'categories' => $this->getCategories(),
        ]);
    }

    public function select()
    {
        $categories = $this->getCategories();
        
        return Inertia::render('Admin/topics/TopicsSelect', [
            'title' => '有興趣的專業主題新知',
            'categories' => $categories,
            'selectedCategories' => [], // Fetch from DB/session
        ]);
    }

    public function storeSelect(Request $request)
    {
        $validated = $request->validate([
            'chk_sn' => 'required|array|min:1|max:30',
            'chk_sn.*' => 'string',
        ]);

        // Save selected categories logic here
        // e.g., save to user preferences or session

        return redirect()->route('admin.topics.index')
                         ->with('success', '主題選擇已更新！');
    }

    public function show($id)
    {
        $topic = Topic::findOrFail($id);
        $topic->increment('views');

        return Inertia::render('Admin/topics/TopicDetail', [
            'topic' => $topic
        ]);
    }

    public function destroy($id)
    {
        $topic = Topic::findOrFail($id);
        $topic->delete();

        return redirect()->route('admin.topics.index')
                         ->with('success', '主題刪除成功');
    }

    public function toggleActive($id)
    {
        $topic = Topic::findOrFail($id);
        $topic->update(['is_active' => !$topic->is_active]);

        return redirect()->back()->with('success', '狀態已更新');
    }

    private function getCategories()
    {
        return [
            ['id' => '73', 'name' => '食之優惠'],
            ['id' => '74', 'name' => '美之優惠'],
            ['id' => '75', 'name' => '住之優惠'],
            ['id' => '76', 'name' => '樂之優惠'],
            ['id' => '77', 'name' => '專之優惠'],
            ['id' => '15', 'name' => '服飾穿搭'],
            ['id' => '16', 'name' => '美髮'],
            ['id' => '17', 'name' => '美甲、美睫'],
            ['id' => '18', 'name' => '最新流行'],
            ['id' => '19', 'name' => '美容護膚、美體'],
            ['id' => '20', 'name' => '植物芳療'],
            ['id' => '21', 'name' => '新娘秘書'],
            ['id' => '22', 'name' => '養生舒壓'],
            ['id' => '32', 'name' => '囍事臨門'],
            ['id' => '84', 'name' => '吃咖情報'],
            ['id' => '85', 'name' => '吃飯好地方'],
            ['id' => '86', 'name' => '巷弄職人'],
            ['id' => '87', 'name' => '烘焙輕食'],
            ['id' => '88', 'name' => '異國料理'],
            ['id' => '89', 'name' => '暗光鳥夜宵'],
            ['id' => '90', 'name' => '食尚選物'],
            ['id' => '91', 'name' => '生鮮蔬果'],
            ['id' => '46', 'name' => '旅遊商圈'],
            ['id' => '36', 'name' => '交通大小事'],
            ['id' => '33', 'name' => '人文熱點'],
            ['id' => '93', 'name' => '旅宿推薦'],
            ['id' => '44', 'name' => '玩耍情報'],
            ['id' => '94', 'name' => '旅遊行程推薦'],
            ['id' => '51', 'name' => '汽機車科技'],
            ['id' => '52', 'name' => '法律知識'],
            ['id' => '45', 'name' => '3C新訊'],
            ['id' => '42', 'name' => '交友聯誼'],
            ['id' => '80', 'name' => '自媒體'],
            ['id' => '40', 'name' => '愛心公益'],
            ['id' => '39', 'name' => '行銷秘笈'],
            ['id' => '38', 'name' => 'AI 新知'],
            ['id' => '83', 'name' => '綠能環保'],
            ['id' => '50', 'name' => '寵物生活館'],
            ['id' => '92', 'name' => '藝術與人文'],
            ['id' => '82', 'name' => '選戰風雲'],
            ['id' => '95', 'name' => '黃金珠寶'],
            ['id' => '35', 'name' => '運動健身'],
            ['id' => '34', 'name' => '健康知識'],
            ['id' => '26', 'name' => '保險知識'],
            ['id' => '29', 'name' => '稱霸鴿界'],
            ['id' => '47', 'name' => '學術交流'],
            ['id' => '49', 'name' => '其他'],
            ['id' => '23', 'name' => '室內設計'],
            ['id' => '24', 'name' => '建築美學'],
            ['id' => '27', 'name' => '租屋甘苦談'],
            ['id' => '30', 'name' => '居家生活'],
            ['id' => '31', 'name' => '鳥語花香'],
            ['id' => '78', 'name' => '房地買賣'],
            ['id' => '79', 'name' => '最新建案'],
            ['id' => '57', 'name' => '佛教'],
            ['id' => '55', 'name' => '道教'],
            ['id' => '54', 'name' => '基督教'],
            ['id' => '56', 'name' => '天主教'],
            ['id' => '61', 'name' => '摩門教'],
            ['id' => '60', 'name' => '東正教'],
            ['id' => '58', 'name' => '回教'],
            ['id' => '59', 'name' => '印度教'],
            ['id' => '62', 'name' => '猶太教'],
            ['id' => '64', 'name' => '宗教器物'],
            ['id' => '65', 'name' => '宗教禁忌'],
            ['id' => '66', 'name' => '宗教稱謂'],
            ['id' => '67', 'name' => '宗教儀式'],
            ['id' => '69', 'name' => '宗教節日'],
            ['id' => '68', 'name' => '宗教活動'],
            ['id' => '70', 'name' => '宗教建築'],
            ['id' => '72', 'name' => '宗教學術'],
            ['id' => '71', 'name' => '宗教藝術'],
        ];
    }
}