import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { trpc } from '@/lib/trpc';
import { Button } from '@/ui/button';
import { Input } from '@/ui/input';
import { Textarea } from '@/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/ui/select';

export function CreateCasePage() {
  const navigate = useNavigate();
  const utils = trpc.useUtils();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [customerId, setCustomerId] = useState('');
  const [assignedTo, setAssignedTo] = useState('');
  const [priority, setPriority] = useState<'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT'>('MEDIUM');

  const { data: customers } = trpc.customer.list.useQuery();
  const { data: users } = trpc.user.list.useQuery();
  const createCase = trpc.case.create.useMutation({
    onSuccess: (data) => {
      // Invalidate case list to refetch with new case
      utils.case.list.invalidate();
      // Navigate to the newly created case
      navigate(`/cases/${data.id}`);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Use first user as creator (in a real app, this would be the logged-in user)
    const createdBy = users?.[0]?.id || '';

    createCase.mutate({
      title,
      description,
      customerId,
      assignedTo: assignedTo || undefined,
      priority,
      createdBy,
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 h-full flex-1 overflow-auto">
      <h1 className="text-2xl font-bold mb-6">Create New Case</h1>

      <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
        <div className="space-y-2">
          <label htmlFor="title" className="text-sm font-medium">
            Case Title *
          </label>
          <Input
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter case title"
            required
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="description" className="text-sm font-medium">
            Case Description *
          </label>
          <Textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter case description"
            rows={5}
            required
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="customer" className="text-sm font-medium">
            Customer *
          </label>
          <Select value={customerId} onValueChange={setCustomerId} required>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a customer" />
            </SelectTrigger>
            <SelectContent>
              {customers?.map((customer) => (
                <SelectItem key={customer.id} value={customer.id}>
                  {customer.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label htmlFor="priority" className="text-sm font-medium">
            Priority *
          </label>
          <Select
            value={priority}
            onValueChange={(value) => setPriority(value as 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT')}
            required
          >
            <SelectTrigger className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="LOW">Low</SelectItem>
              <SelectItem value="MEDIUM">Medium</SelectItem>
              <SelectItem value="HIGH">High</SelectItem>
              <SelectItem value="URGENT">Urgent</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label htmlFor="assignedTo" className="text-sm font-medium">
            Assign To (Optional)
          </label>
          <Select value={assignedTo || undefined} onValueChange={setAssignedTo}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Unassigned" />
            </SelectTrigger>
            <SelectContent>
              {users?.map((user) => (
                <SelectItem key={user.id} value={user.id}>
                  {user.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex gap-3 pt-4">
          <Button
            type="submit"
            disabled={createCase.isPending}
            className="bg-[#00848b] hover:bg-[#006d73] text-white"
          >
            {createCase.isPending ? 'Creating...' : 'Create Case'}
          </Button>
          <Button type="button" variant="outline" onClick={() => navigate(-1)}>
            Cancel
          </Button>
        </div>

        {createCase.isError && (
          <div className="text-red-600 text-sm">
            Error creating case: {createCase.error.message}
          </div>
        )}
      </form>
    </div>
  );
}
