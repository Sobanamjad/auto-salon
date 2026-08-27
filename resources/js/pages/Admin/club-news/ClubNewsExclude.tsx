import { Head, Link, router } from '@inertiajs/react';
import { useState } from 'react';
import { 
    FaArrowLeft, FaSave, FaCheck, FaTimes,
    FaNewspaper, FaExclamationCircle
} from 'react-icons/fa';

interface ExcludedTopic {
    id: number;
    name: string;
    category: string;
    is_checked: boolean;
}

interface Props {
    title?: string;
    excludedTopics?: ExcludedTopic[];
}

export default function ClubNewsExclude({ title = '排除的主題', excludedTopics = [] }: Props) {
    const [selectedTopics, setSelectedTopics] = useState<string[]>(
        excludedTopics.filter(t => t.is_checked).map(t => t.id.toString())
    );

    const toggleAll = () => {
        if (selectedTopics.length === excludedTopics.length) {
            setSelectedTopics([]);
        } else {
            setSelectedTopics(excludedTopics.map(t => t.id.toString()));
        }
    };

    const toggleTopic = (id: string) => {
        setSelectedTopics(prev =>
            prev.includes(id)
                ? prev.filter(t => t !== id)
                : [...prev, id]
        );
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Submit selected topics
        router.post('/admin/club-news/exclude', {
            chk_sn: selectedTopics
        }, {
            onSuccess: () => {
                alert('排除主題已更新！');
            }
        });
    };

    return (
        <>
            <Head title={title} />
            
            <div className="bg-white rounded-xl shadow-sm p-6">
                {/* Header */}
                <div className="flex items-center justify-between border-b border-gray-200 pb-4 mb-6">
                    <div className="flex items-center gap-3">
                        <Link 
                            href="/admin/club-news"
                            className="text-gray-500 hover:text-gray-700 transition-colors"
                        >
                            <FaArrowLeft size={20} />
                        </Link>
                        <div>
                            <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                                <FaExclamationCircle className="text-orange-500" /> {title}
                            </h2>
                            <p className="text-sm text-gray-500 mt-1">管理被排除的新聞主題</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <Link
                            href="/admin/club-news"
                            className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors flex items-center gap-2"
                        >
                            <FaTimes /> 取消返回
                        </Link>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="bg-gray-50 rounded-lg p-6">
                        <div className="flex items-center gap-2 mb-4">
                            <input
                                type="checkbox"
                                checked={selectedTopics.length === excludedTopics.length && excludedTopics.length > 0}
                                onChange={toggleAll}
                                className="w-4 h-4 text-blue-600 rounded"
                            />
                            <label className="text-sm font-medium text-gray-700">全選</label>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                            {excludedTopics.map((topic) => (
                                <div key={topic.id} className="flex items-center gap-2 p-2 bg-white rounded border border-gray-200 hover:bg-gray-50">
                                    <input
                                        type="checkbox"
                                        checked={selectedTopics.includes(topic.id.toString())}
                                        onChange={() => toggleTopic(topic.id.toString())}
                                        className="w-4 h-4 text-blue-600 rounded"
                                    />
                                    <span className="text-sm">{topic.name}</span>
                                    {topic.category && (
                                        <span className="text-xs text-gray-400">({topic.category})</span>
                                    )}
                                </div>
                            ))}
                        </div>

                        {excludedTopics.length === 0 && (
                            <div className="text-center py-8 text-gray-500">
                                <FaNewspaper size={32} className="mx-auto text-gray-300 mb-2" />
                                <p>暫無排除主題</p>
                            </div>
                        )}
                    </div>

                    <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-200">
                        <Link
                            href="/admin/club-news"
                            className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                        >
                            取消返回
                        </Link>
                        <button
                            type="submit"
                            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
                        >
                            <FaSave /> 送出
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
}